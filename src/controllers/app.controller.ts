import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

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
