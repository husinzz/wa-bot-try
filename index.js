const qrcode = require('qrcode-terminal');
const express = require('express');

const { Client, LocalAuth, MessageMedia, ChatTypes } = require('whatsapp-web.js');
const app = express();
const port = 3000;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    // args: ['--no-sandbox'],
  }
});

client.initialize();

client.on('authenticated', () => {
  console.log("Authenticated");
})

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', message => {
	if(message.body === 'halo') {
		client.sendMessage(message.from, `hi ${message.author}`);
	}
});

app.get('/send-message', (req, res) => {

  let numbers = [
    '6287829134143@c.us',
    '6281288995413@c.us',
    '6282140897472@c.us',
    '6282210189370@c.us',
    '6281333800037@c.us',
    '6285230898079@c.us',
    '6282219738846@c.us'
  ]

  numbers.map((number) => {
    client.sendMessage(number, "Test");
  })

  res.send("udah")
})


app.listen(port, () => {
  console.log(`App is running in port ${port}`);
})