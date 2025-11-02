import {
  Client,
  GatewayIntentBits,
  Message,
  Events,
  TextChannel,
  ButtonInteraction,
} from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// ✅ Khắc phục lỗi __dirname trong ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Tạo bot Discord với các quyền cần thiết
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = "!";

// ✅ Interface cho lệnh prefix
interface PrefixCommand {
  name: string;
  execute: (message: Message, args: string[]) => Promise<void>;
}

// ✅ Interface cho lệnh nút bấm
interface ButtonCommand {
  name: string;
  execute: (interaction: ButtonInteraction) => Promise<void>;
}

// ✅ Tải các lệnh từ thư mục commands
const prefixCommands = new Map<string, PrefixCommand>();
const buttonCommands = new Map<string, ButtonCommand>();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  if ("name" in command && "execute" in command) {
    if (command.execute.length === 2) {
      // Lệnh prefix: (message, args)
      prefixCommands.set(command.name.toLowerCase(), command);
    } else {
      // Lệnh nút: (interaction)
      buttonCommands.set(command.name, command);
    }
  }
}

// ✅ Xử lý tin nhắn và thực hiện lệnh prefix
client.on("messageCreate", async (message: Message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const rawCommand = args.shift();
  if (!rawCommand) return;

  const commandName = rawCommand.toLowerCase();
  const command = prefixCommands.get(commandName);
  if (command) {
    try {
      await command.execute(message, args);
    } catch (err) {
      console.error(err);
      message.reply("❌ Có lỗi xảy ra khi thực hiện lệnh.");
    }
  }
});

// ✅ Xử lý tương tác nút bấm
client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    const command = buttonCommands.get(interaction.customId);
    if (command) {
      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
        await interaction.reply({
          content: "❌ Có lỗi xảy ra khi xử lý nút.",
          ephemeral: true,
        });
      }
    }
  }
});

// ✅ Chào mừng thành viên mới
client.on(Events.GuildMemberAdd, (member) => {
  const WelcomeChannel = process.env.WelcomeChannel;
  const channel = member.guild.channels.cache.get(WelcomeChannel || "");

  if (channel && channel.isTextBased()) {
    (channel as TextChannel).send(
      `👋 Chào mừng ${member.user.username} đến với server **${member.guild.name}**!`
    );
  }
});

// ✅ Khi bot sẵn sàng
client.once("ready", () => {
  console.log(`✅ Bot đã đăng nhập với tên ${client.user?.tag}`);
});

// ✅ Đăng nhập bot bằng token từ .env
const token = process.env.TokenBot;
if (!token) throw new Error("Thiếu TokenBot trong file .env");
client.login(token);
