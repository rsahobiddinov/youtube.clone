import { DynamicModule, Global, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ResendModule } from 'nestjs-resend';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import VideoServices from './video.service';
import { SeederModule } from './database/seeders/seeder.module';

@Global()
@Module({
  imports: [
    DatabaseModule,
    SeederModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_KEY'),
        signOptions: {
          expiresIn: '2h',
        },
      }),
    }),
    ResendModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('RESEND_API_KEY') as string,
      }),
    }) as DynamicModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  providers: [VideoServices],
  exports: [VideoServices],
})
export class CoreModule {}
