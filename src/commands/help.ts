// commands/help.ts
import {
    Message,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} from "discord.js";

export const name = "help";

export async function execute(message: Message) {
    const embed = new EmbedBuilder()
        .setColor(0x00ffcc)
        .setTitle("📘 Commands when calling the bot")
        .addFields(
            { name: "!help", value: "show list commands", inline: false },
            { name: "!ping", value: "test ping when use bot", inline: false },
            { name: "!info", value: "check your info in list", inline: false }
        );

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
        .setCustomId("ping_button") // 👈 trùng với file ping-button.ts
        .setLabel("🏓 Run Ping")
        .setStyle(ButtonStyle.Primary)
    );

    await message.reply({ embeds: [embed], components: [row] });
}
