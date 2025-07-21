const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // Si tu es dans Node.js sans global fetch

const imageHtml = fs.readFileSync(path.join(__dirname, 'image.html'), 'utf-8');

fetch('http://localhost:3000/image/generate', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        vueCode: imageHtml,
        tailwindcss: true,
        width: 800,
        height: 400,
        format: 'png'
    })
})
    .then(async response => {
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(path.join(__dirname, 'output.png'), Buffer.from(buffer));
        console.log('Image successfully saved as output.png');
    })
    .catch(err => {
        console.error(err);
    });
