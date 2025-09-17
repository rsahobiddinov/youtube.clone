import {
  Get,
  Put,
  Req,
  Res,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
  Controller,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req: Request, file, callback) => {
            if (file.fieldname === 'thumbnail') {
              callback(null, 'uploads/thumbnails');
            } else {
              callback(null, 'uploads');
            }
          },
          filename: (req: Request, file, callback) => {
            const ext = path.extname(file.originalname);
            const fileName = `${Date.now()}${ext}`;
            callback(null, fileName);
          },
        }),
      },
    ),
  )
  async uploadVideo(
    @Body() body: CreateVideoDto,
    @Req() req: Request,
    @UploadedFiles()
    files: { file: Express.Multer.File; thumbnail: Express.Multer.File },
  ) {
    const userId = req['userId'];
    return await this.videoService.uploadVideo(
      files.file[0],
      body,
      userId,
      files.thumbnail[0],
    );
  }

  @Get('all')
  async getAll() {
    return await this.videoService.getAllVideos();
  }

  @Get('watch/:id')
  async watch(
    @Param('id') id: string,
    @Query('quality') quality: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const range = req.headers.range || '';
    return this.videoService.watchVideo(id, quality || '720', range, res);
  }

  @UseGuards(AuthGuard)
  @Get(':id/status')
  async getStatus(@Param('id') id: string) {
    return this.videoService.getVideoStatus(id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getDetails(@Param('id') id: string) {
    return this.videoService.getVideoDetails(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateVideo(@Param('id') id: string, @Req() req, @Body() body: any) {
    return this.videoService.updateVideo(id, req.user.id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteVideo(@Param('id') id: string, @Req() req) {
    return this.videoService.deleteVideo(id, req.user.id);
  }

  @Get('feed')
  async getFeed(@Query() query: any) {
    return this.videoService.getVideoFeed(query);
  }

  @Get('search')
  async search(
    @Query('q') q: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.videoService.searchVideos(
      q,
      Number(page) || 1,
      Number(limit) || 20,
    );
  }

  @Get('trending')
  async trending(
    @Query('category') category: string,
    @Query('region') region: string,
    @Query('timeframe') timeframe: string,
  ) {
    return this.videoService.getTrendingVideos(
      category || 'all',
      region || 'global',
      timeframe || '24h',
    );
  }
}
