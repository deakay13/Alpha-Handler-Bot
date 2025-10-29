import { Message } from "discord.js";
export const name = "ping";
export async function execute(message, args) {
    await message.reply("🏓 Pong!");
}
