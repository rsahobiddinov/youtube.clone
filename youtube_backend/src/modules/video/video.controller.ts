import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { Request, Response } from 'express';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, callback) => {
          const mimeType = path.extname(file.originalname);
          const fileName = `${Date.now()}${mimeType}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateVideoDto,
    @Req() req: Request,
  ) {
    const userId = req['userId'];
    return await this.videoService.uploadVideo(file, body, userId);
  }

  @Get(':id/stream')
  @SetMetadata('isFreeAuth', true)
  async watchVideo(
    @Param('id') id: string,
    @Query('quality') quality: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const param = id;
    const contentRange = req.headers.range;
    await this.videoService.watchVideo(
      param,
      quality,
      contentRange as string,
      res,
    );
  }

  @Get(':id')
  @SetMetadata('isFreeAuth', true)
  async getVideoDetails(@Param('id') id: string) {
    return await this.videoService.getVideoDetails(id);
  }
  @Put(':id')
  async updateVideo(@Param('id') id: string, @Body() body: UpdateVideoDto) {
    return await this.videoService.updateVideo(id, body);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['SUPERADMIN', 'ADMIN', 'OWNER'])
  async deleteVideo(@Param('id') id: string) {
    return await this.videoService.deleteVideo(id);
  }

  @Get('feed/videos')
  @SetMetadata('isFreeAuth', true)
  async getVideosFeed(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return await this.videoService.getVideosFeed(page, limit);
  }
}
