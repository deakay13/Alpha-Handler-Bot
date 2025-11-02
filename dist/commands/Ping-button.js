// commands/ping-button.ts
import { ButtonInteraction } from "discord.js";
export const name = "ping_button";
export async function execute(interaction) {
    await interaction.reply("🏓 Pong!");
}
