// commands/help.ts
import { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, } from "discord.js";
export const name = "help";
export async function execute(message) {
    const embed = new EmbedBuilder()
        .setColor(0x00ffcc)
        .setTitle("📘 Commands when calling the bot")
        .addFields({ name: "!help", value: "show list commands" }, { name: "!ping", value: "test ping when use bot" }, { name: "!info", value: "check your info in list" });
    const row = new ActionRowBuilder().addComponents(new ButtonBuilder()
        .setCustomId("ping_button") // 👈 trùng với file ping-button.ts
        .setLabel("🏓 Run Ping")
        .setStyle(ButtonStyle.Primary));
    await message.reply({ embeds: [embed], components: [row] });
}
