```javascript
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Gantilah dengan token bot Anda
const token = '8010600412:AAH54PzbTV0TeRwt1SPC40zzgjGlE9LRt0w';
const bot = new TelegramBot(token, { polling: true });

let products = [];

// Load produk dari file JSON
fs.readFile('products.json', (err, data) => {
    if (err) {
        console.error('Error reading products.json', err);
    } else {
        products = JSON.parse(data);
    }
});

// Menampilkan daftar produk
bot.onText(/\/start/, (msg) => {
    const welcomeMessage = 'Selamat datang! Berikut adalah daftar produk yang tersedia:\n' +
        products.map(p => `${p.id}: ${p.name} - Rp${p.price}`).join('\n') +
        '\n\nKetik /buy <id> untuk membeli produk.';
    bot.sendMessage(msg.chat.id, welcomeMessage);
});

// Membeli produk
bot.onText(/\/buy (\d+)/, (msg, match) => {
    const productId = parseInt(match[1]);
    const product = products.find(p => p.id === productId);
    if (product) {
        bot.sendMessage(msg.chat.id, `Anda telah membeli ${product.name} seharga Rp${product.price}. Terima kasih!`);
    } else {
        bot.sendMessage(msg.chat.id, 'Produk tidak ditemukan. Silakan coba lagi dengan ID yang valid.');
    }
});

// Menampilkan informasi produk tertentu
bot.onText(/\/info (\d+)/, (msg, match) => {
    const productId = parseInt(match[1]);
    const product = products.find(p => p.id === productId);
    if (product) {
        bot.sendMessage(msg.chat.id, `Informasi Produk:\nNama: ${product.name}\nHarga: Rp${product.price}`);
    } else {
        bot.sendMessage(msg.chat.id, 'Produk tidak ditemukan. Silakan coba lagi dengan ID yang valid.');
    }
});

// Menampilkan bantuan
bot.onText(/\/help/, (msg) => {
    const helpMessage = 'Perintah yang tersedia:\n' +
        '/start - Menampilkan daftar produk\n' +
        '/buy <id> - Membeli produk berdasarkan ID\n' +
        '/info <id> - Menampilkan informasi produk berdasarkan ID\n' +
        '/help - Menampilkan bantuan';
    bot.sendMessage(msg.chat.id, helpMessage);
});
```
