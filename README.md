# VuePNG

Generate images (PNG or JPEG) directly from Vue.js components using Puppeteer.

## Description

**VuePNG** is a lightweight service that renders Vue 3 templates into static images. It's useful for generating Open Graph images, social previews, or any custom visuals from code. The rendered content can be styled using Tailwind CSS, and dynamic data can be passed through the Vue instance.

> Inspired by the excellent [Nuxt OG Image](https://github.com/nuxt-modules/og-image), but framework-agnostic and focused on raw Vue rendering.

## Rate Limit Notice
This API is rate-limited to 1 request per 2 seconds per IP to ensure fair usage and prevent abuse.
If you need higher throughput, consider self-hosting the service!

## Generation URL
```
https://vuepng.maxence-bessi.com/image/generate
```

## Example Data
- <u>[Image Model](src/models/Image.models.ts)</u>

```
{
  "vueCode": "<div class="font-bold">Hello {{ name }}!</div>",
  "data": { "name": "C1ach0" },
  "width": 800,
  "height": 600,
  "format": "png",
  "tailwindcss": true
}
```

## Example Usage
```js
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const imageHtml = fs.readFileSync(path.join(__dirname, 'image.html'), 'utf-8');

fetch('https://vuepng.maxence-bessi.com/image/generate', {
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
}).then(async response => {
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
```

## Tips & Tricks

- Use tailwindcss: `true` to easily style with Tailwind utility classes!
- You can include custom CSS via the css property to tweak styles.
- Make sure your vueCode is valid Vue template HTML (no full single file components, just the template string).
- Keep your width and height proportional for best quality images.
- You can use all the standard Vue directives like `v-for`, `v-if`, `v-else`, `:class` and many more directly in your templatest
- Feel free to experiment with complex templates and reactive data to generate dynamic images!

## Powered By Me :3
This project is deployed and hosted on my server

## MIT License
This project is licensed under MIT License
