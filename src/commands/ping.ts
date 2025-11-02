import { Message, ButtonInteraction } from "discord.js";

export const name = "ping";

export async function execute(
    source: Message | ButtonInteraction,
    args?: string[]
) {
    await source.reply("🏓 Pong!");
}
