// commands/ping-button.ts
import { ButtonInteraction } from "discord.js";

export const name = "ping_button";

export async function execute(interaction: ButtonInteraction) {
    await interaction.reply("🏓 Pong!");
}
