import type { RESTPostAPIChannelMessageResult } from 'discord-api-types/v8';
import { WebhookClient } from 'discord.js';
import { readdir, readFile } from 'node:fs/promises';
import { URL } from 'node:url';
import { promisify } from 'util';

/* Regexes, constants, and utility functions */
const jumpRegex = /%JUMP_TO_TOP%/gm;

const SkyraLoungeServerId = '254360814063058944';
const imagesBaseUrl = 'https://raw.githubusercontent.com/skyra-project/resource-webhooks/main/resources/images';
const replacePatterns: Record<string, string> = {} as const;
const linkEscapeRegex = /\[(.+?)\]\((.+?)\)/gm;
const resolveIdentifier = (channelName: string): string => channelName.toUpperCase().replace(/-/gm, '_');
const linkEscapeReplacer = (_: any, p1: string, p2: string): string => `[${p1}](<${p2}>)`;
const isDraft = (channelName: string) => channelName.toLowerCase().startsWith('draft');
const isRelease = (channelName: string) => channelName.toLowerCase().startsWith('release');
const transformDraftToRelease = (channelName: string) => channelName.replace('DRAFT', 'RELEASE');

const wait: {
	(ms: number): Promise<void>;
	<T>(ms: number, value: T): Promise<T>;
} = promisify(setTimeout);

/* Start processing */

const deployChannelString = process.env.DEPLOY_CHANNELS;
const channels = deployChannelString
	?.trim()
	.split(/ *, */gm)
	.map((c) => resolveIdentifier(c));

// If there are no channels provided through GitHub inputs then throw
if (!channels) {
	throw new Error(`[MISSING] No deploy channels provided`);
}

// Get the resources directory
const resourcesDir = new URL('../resources/', import.meta.url);

// Read the files in the directory
const files = await readdir(resourcesDir);

// Check if there are any hooks missing, for release updates we specifically check for the release webhook.
const missingHooks = channels.filter((c) => {
	if (isRelease(c)) {
		return !Boolean(process.env.RELEASE);
	}

	if (isDraft(c)) {
		return !Boolean(process.env.DRAFT);
	}

	return !Boolean(process.env[c]);
});

// Check if there are any files missing
const missingFiles = channels.filter((c) => {
	if (isDraft(c)) {
		return !files.includes(`${transformDraftToRelease(c)}.md`);
	}

	return !files.includes(`${c}.md`);
});

if (missingHooks.length) {
	throw new Error(`[MISSING] No webhook environment variable(s) for ${missingHooks.join(', ')}`);
}

if (missingFiles.length) {
	throw new Error(`[MISSING] No file for ${missingFiles.map((c) => `${c}.md`).join(', ')}`);
}

// Iterate over all the channels and their respective "channelWithoutDate" entry
for (const channel of channels) {
	console.log(`[STARTING] Deploying ${channel}`);

	// The env var to use
	const envVarToUse = isRelease(channel) ? 'RELEASE' : isDraft(channel) ? 'DRAFT' : channel;
	const roleToMention = isRelease(channel) ? '352412797176643585' : isDraft(channel) ? '541743369081192451' : '';

	// Get the hookID and hookToken. If it is a release channel then just get the release environment variable.
	const [hookID, hookToken] = process.env[envVarToUse]!.split('/').slice(-2);
	const hook = new WebhookClient(hookID, hookToken);

	// Get the proper file name
	const fileName = `${transformDraftToRelease(channel)}.md`;

	// Read the file and replace some content in it to make it Discord message ready
	const raw = await readFile(new URL(fileName, resourcesDir), { encoding: 'utf8' });

	const r1 = isRelease(channel) || isDraft(channel) ? `**New announcement for** <@&${roleToMention}>:\n${raw}` : raw;
	const r2 = r1.replace(linkEscapeRegex, linkEscapeReplacer);
	const r3 = Object.entries(replacePatterns).reduce((acc, [k, v]) => {
		const regex = new RegExp(k, 'gm');
		return acc.replace(regex, v);
	}, r2);
	const r4 = r3.replace(/%PNG_([A-Z_]+)%/gm, `${imagesBaseUrl}/${channel}/$1.png`);

	const parts = r4.split('\n\n');

	// Store a reference to the first message
	let firstMessage: RESTPostAPIChannelMessageResult | null = null;

	// Send each of the parts
	for (let part of parts) {
		if (firstMessage) {
			part = part.replace(jumpRegex, `https://discord.com/channels/${SkyraLoungeServerId}/${firstMessage.channel_id}/${firstMessage.id}`);
		}

		// A raw API response is returned here, not a Message object as the typings indicate
		const response = ((await hook.send(part, {
			avatarURL: process.env.WEBHOOK_AVATAR,
			username: process.env.WEBHOOK_NAME,
			allowedMentions: {
				users: [],
				roles: [roleToMention]
			}
		})) as unknown) as RESTPostAPIChannelMessageResult;

		if (!firstMessage) firstMessage = response;

		await wait(1000);
	}

	hook.destroy();
}
