import { Injectable } from '@nestjs/common';
import chromium from "@sparticuz/chromium-min";
import * as puppeteerCore from "puppeteer-core";
import * as puppeteer from "puppeteer";
import { ImageBuilder } from '../models/Image.models';

const remoteExecutablePath =
  'https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar';

@Injectable()
export class ImageService {

  private browser: puppeteer.Browser | puppeteerCore.Browser | null = null;

  public async generate(body: ImageBuilder): Promise<Buffer> {
    const { vueCode, data, width, height, format = 'png', css = "", tailwindcss = false } = body;
    const template = vueCode
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Image Generator</title>
  ${tailwindcss ? '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>' : ''}
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    ${css}
  </style>
  <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>
<body>
  <div id="app"></div>
  
  <script>
    const App = {
      template: '${template}',
      data() {
        return ${JSON.stringify(data ?? {})};
      }
    };
    const app = Vue.createApp(App);
    app.mount("#app");
    app.$nextTick(() => {
      window.isReady = true;
    });
  </script>
</body>
</html>
`.replace(/(\r\n|\n|\r|\t)/gm, '').replace(/\s{2,}/g, ' ').trim();
      const browser = await this.getBrowser();
      const page = await browser.newPage();
      await page.setViewport({ width, height });

      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      const screenshot = await page.screenshot({ type: format });
      await browser.close();

      return Buffer.isBuffer(screenshot) ? screenshot : Buffer.from(screenshot);
  }


  private async getBrowser(): Promise<puppeteer.Browser | puppeteerCore.Browser> {
    if (this.browser) return this.browser;

    const isProd = process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === 'production';

    if (isProd) {
      this.browser = await puppeteerCore.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(remoteExecutablePath),
        headless: true,
      });
    } else {
      this.browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true
      });
    }

    return this.browser;
  }
}
