import { Message, EmbedBuilder, TextChannel } from "discord.js";
export const name = "Help";
export async function execute(message, args) {
    const embed = new EmbedBuilder()
        .setColor(0x00ffcc)
        .setTitle("📘 Trợ lý ảo Kon")
        .setDescription("Đây là thông báo từ trợ lý ảo của bạn. Hãy nhập lệnh để được giúp đỡ!")
        .setFooter({ text: "Agent Bot • 2025" });
    // Kiểm tra kênh có phải là TextChannel không
    if (message.channel instanceof TextChannel) {
        await message.channel.send({ embeds: [embed] });
    }
    else {
        console.log("Không thể gửi embed trong loại kênh này.");
    }
}
