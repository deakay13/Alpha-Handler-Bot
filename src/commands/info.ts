import { Message } from "discord.js";

export const name = "Info";

export async function execute(message: Message, args: string[]) {
  const user = message.author;
  const member = message.member;

  const embed = {
    color: 0x00ffcc,
    title: `Thông tin của ${user.username}`,
    thumbnail: {
      url: user.displayAvatarURL(),
    },
    fields: [
      {
        name: "🆔 ID",
        value: user.id,
        inline: true,
      },
      {
        name: "📅 Tạo tài khoản",
        value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`,
        inline: true,
      },
      {
        name: "📥 Tham gia server",
        value: member?.joinedTimestamp
          ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`
          : "Không rõ",
        inline: true,
      },
      {
        name: "💬 Trạng thái",
        value: member?.presence?.status || "Không xác định",
        inline: true,
      },
    ],
  };

  await message.reply({ embeds: [embed] });
}
