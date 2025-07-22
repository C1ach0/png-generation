import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller()
export class AppController {

  @Get()
  getIndex(@Res() res: Response) {
    const filePath = path.join(__dirname, '..', '..', 'public', 'index.html');
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(500).send('Oops, fichier introuvable... Meow! 🐾');
      }
    });
  }

  @Get("/docs")
  getDocs(@Res() res: Response) {
    const filePath = path.join(__dirname, '..', '..', 'public', 'docs.html');
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(500).send('Oops, fichier introuvable... Meow! 🐾');
      }
    });
  }

}
