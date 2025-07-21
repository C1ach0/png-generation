import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ImageBuilder } from '../models/Image.models';
import { Response } from 'express';
import { ImageService } from '../services/image.service';
import * as path from 'path';

@Controller("image")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post("/generate")
  async generateImage(
    @Body() body: ImageBuilder,
    @Res() res: Response
  ) {
    const buffer: Buffer = await this.imageService.generate(body);

    const filename = `generated.${body.format ?? 'png'}`;

    res
      .status(HttpStatus.OK)
      .setHeader('Content-Type', `image/${body.format ?? 'png'}`)
      .setHeader(
        'Content-Disposition',
        `inline; filename="${filename}"`
      )
      .setHeader(
        'Cache-Control',
        'public, max-age=31536000, immutable'
      )
      .send(buffer);
  }
}
