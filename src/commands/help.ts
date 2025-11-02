import { Message } from "discord.js";

export const name = "Help";

export async function execute(message: Message, args: string[]) {
    const embed = {
        color: 0x00ffcc,
        title: `Thông tin của Dog`,

        fields: [
            {
                name: "Hello",
                value: "Gâu Gâu",
                inline: true,
            },
            {
                name: "📅 Đây là Dog",
                value: "Dog là trợ lý ảo dễ thương.",
                inline: true,
            },
        ],
    };

    await message.reply({ embeds: [embed] });
}
