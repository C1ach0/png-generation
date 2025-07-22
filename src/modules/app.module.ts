import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { ImageModule } from './image.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

function isLocalIp(ip: string): boolean {
  return ip.startsWith('192.168.') || ip.startsWith('172.') || ip === '127.0.0.1' || ip === '::1';
}

@Module({
  imports: [
    // Add Rate Limite 1 / 2sec (skip for my server)
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 2000,
          limit: 1,
          skipIf: (context) => {
            const req = context.switchToHttp().getRequest();
            const ip = req.ips?.[0] || req.ip || '';
            return isLocalIp(ip);
          },
        },
      ],
    }),
    ImageModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule { }