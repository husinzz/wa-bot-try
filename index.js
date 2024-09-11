const qrcode = require("qrcode-terminal");
const express = require("express");

const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const app = express();
const port = 3000;

app.use(express.json());

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

client.initialize();

client.on("authenticated", () => {
  console.log("Authenticated");
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.once("ready", () => {
  console.log("Client is ready!");
});

app.get("/send-message", async (req, res) => {
  const { message, numbers } = await req.body;

  numbers.map(async (number, index) => {
    setTimeout(() => {
      client.sendMessage(number + "@c.us", message);
    }, index * 5000);
  });

  res.send("Tunggu di kirim semua, jangan di matiin! cara cek nya lihat nomor terakhir di list udah di kirim atau belum");
});

app.get("/send-message-with-photo", async (req, res) => {
  const { image, message, numbers } = await req.body;

  const media = MessageMedia.fromFilePath(`./media/${image}`);
  if (media) {
    numbers.map(async (number, index) => {
      setTimeout(() => {
        client.sendMessage(number + "@c.us", media, { caption: message });
      }, index * 5000);
    });
  }

  res.send("Tunggu di kirim semua, jangan di matiin! cara cek nya lihat nomor terakhir di list udah di kirim atau belum");
});

app.listen(port, () => {
  console.log(`App is running in port ${port}`);
});
