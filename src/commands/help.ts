import { Message } from "discord.js";

export const name = "help";

export async function execute(message: Message, args: string[]) {
    const embed = {
        color: 0x00ffcc,
        title: `commands when calling the bot`,
        fields: [
            {
            name: "!help",
            value: "show list commands",
            inline: true,
            },
            {
            name: "!ping",
            value: "test ping when use bot",
            inline: true,
            },
            {
            name: "!info",
            value: "check your info in list",
            inline: true,
            },
        ],
    };

    await message.reply({ embeds: [embed] });
}
