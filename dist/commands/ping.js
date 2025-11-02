import { Message, ButtonInteraction } from "discord.js";
export const name = "ping";
export async function execute(source, args) {
    await source.reply("🏓 Pong!");
}
