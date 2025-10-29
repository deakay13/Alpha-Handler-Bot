import { Client, GatewayIntentBits, Message } from "discord.js";
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
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
const prefix = "!";
// ✅ Tải các lệnh từ thư mục commands
const commands = new Map();
const commandFiles = fs
    .readdirSync(path.join(__dirname, "commands"))
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
for (const file of commandFiles) {
    const { name, execute } = await import(`./commands/${file}`);
    commands.set(name, { name, execute });
}
// ✅ Xử lý tin nhắn và thực hiện lệnh
client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix))
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const rawCommand = args.shift();
    if (!rawCommand)
        return;
    const commandName = rawCommand.toLowerCase();
    const command = commands.get(commandName);
    if (command) {
        try {
            await command.execute(message, args);
        }
        catch (err) {
            console.error(err);
            message.reply("❌ Có lỗi xảy ra khi thực hiện lệnh.");
        }
    }
});
// ✅ Khi bot sẵn sàng
client.once("ready", () => {
    console.log(`✅ Bot đã đăng nhập với tên ${client.user?.tag}`);
});
// ✅ Đăng nhập bot bằng token từ .env
const token = process.env.TokenBot;
if (!token)
    throw new Error("Thiếu TokenBot trong file .env");
client.login(token);
