import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import fs from 'fs';
import path from 'path';
import { Response } from 'express';
import { VideoResolution } from './types';
import VideoConvertService from './video_convert.service';
import { CreateVideoDto } from './dto/create-video.dto';
import deleteFile from 'src/common/utils/delete.file';

@Injectable()
export class VideoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly videoConvertService: VideoConvertService,
  ) {}
  async uploadVideo(
    file: Express.Multer.File,
    videoData: CreateVideoDto,
    id: string,
    thumbnail: Express.Multer.File,
  ) {
    const findChannel = await this.prisma.user.findFirst({ where: { id } });
    if (!findChannel) {
      await deleteFile(file.filename);
      throw new NotFoundException('Channel not found');
    }
    const fileName = file.filename;
    const fileNameData = path.join(
      process.cwd(),
      'uploads',
      fileName.split('.')[0],
    );
    const videoPath = path.join(process.cwd(), 'uploads', fileName);
    const resolution: any =
      await this.videoConvertService.getVideoResolution(videoPath);
    const resolutions = [
      { height: 240 },
      { height: 360 },
      { height: 480 },
      { height: 720 },
      { height: 1080 },
    ];

    const validResolutions = resolutions.filter(
      (r) => r.height <= resolution.height + 6,
    );

    if (validResolutions.length > 0) {
      fs.mkdir(
        path.join(process.cwd(), 'uploads', 'videos', fileName.split('.')[0]),
        {
          recursive: true,
        },
        (err) => {
          if (err) throw new InternalServerErrorException(err);
        },
      );
      await Promise.all(
        this.videoConvertService.convertToResolutions(
          videoPath,
          path.join(process.cwd(), 'uploads', 'videos', fileName.split('.')[0]),
          validResolutions,
        ),
      );
      fs.unlinkSync(videoPath);
      const result = await this.prisma.video.create({
        data: {
          ...videoData,
          videoUrl: fileNameData,
          authorId: id,
          status: 'PUBLISHED',
          thumbnail: `/uploads/thumbnails/${thumbnail.filename}`,
          fileSize: file.size,
          folderName: file.filename,
        },
      });
      return {
        message: 'Video uploaded successfully',
        data: result,
      };
    } else {
      fs.unlinkSync(videoPath);
      throw new BadRequestException(
        'Video sifati juda past, iltimos sifatli video yuklang',
      );
    }
  }

  async getAllVideos() {
    const videos = await this.prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: true, category: true, comments: true },
    });

    const serialized = videos.map((v) => ({
      id: v.id,
      title: v.title,
      folderName: v.folderName,
      description: v.description,
      videoUrl: v.videoUrl || null,
      thumbnail: v.thumbnail || '/uploads/thumbnails/default.jpg',
      duration: v.duration,
      viewsCount: Number(v.viewsCount) || 0,
      likesCount: Number(v.likesCount) || 0,
      dislikesCount: Number(v.dislikesCount) || 0,
      commentsCount: v.comments.length,
      publishedAt: v.createdAt.toISOString(),
      tags: v.tags || [],
      category: v.category ? v.category.title : 'General',
      author: {
        id: v.author.id,
        username: v.author.username,
        channelName: `${v.author.firstName} ${v.author.lastName}`,
        avatar: v.author.avatar || '/uploads/avatars/default-avatar.jpg',
      },
    }));

    return { success: true, data: serialized };
  }

  async watchVideo(id: string, quality: string, range: string, res: Response) {
    const video = await this.prisma.video.findUnique({
      where: { id },
      select: { folderName: true },
    });

    if (!video) throw new NotFoundException('Video topilmadi');

    const baseQuality = `${quality}.mp4`;
    const videoPath = path.join(
      process.cwd(),
      'uploads',
      'videos',
      video.folderName,
      baseQuality,
    );

    if (!fs.existsSync(videoPath)) {
      throw new NotFoundException('Video file not found on server');
    }

    const { size } = fs.statSync(videoPath);
    if (!range) {
      range = `bytes=0-1048575`;
    }
    const { start, end, chunkSize } = this.videoConvertService.getChunkProps(
      range,
      size,
    );
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    });
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
    videoStream.on('error', (err) => {
      console.error('Stream error:', err);
      res.sendStatus(500);
    });
  }

  async getVideoStatus(videoId: string) {
    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
      select: {
        id: true,
        status: true,
        videoUrl: true,
      },
    });

    if (!video) {
      throw new NotFoundException('Video topilmadi');
    }

    return {
      success: true,
      data: {
        id: video.id,
        status: video.status,
        processingProgress: video.status === 'PUBLISHED' ? 100 : 65,
        availableQualities: ['720p'],
        estimatedTimeRemaining:
          video.status === 'PUBLISHED' ? '0 minutes' : '2-5 minutes',
      },
    };
  }

  async getVideoDetails(videoId: string) {
    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
      include: {
        author: true,
        comments: true,
        likes: true,
        category: true,
      },
    });

    if (!video) {
      throw new NotFoundException('Video topilmadi');
    }

    return {
      success: true,
      data: {
        id: video.id,
        title: video.title,
        description: video.description,
        thumbnail:
          video.thumbnail ||
          `https://cdn.example.com/thumbnails/${video.id}.jpg`,
        videoUrl: `https://cdn.example.com${video.videoUrl}`,
        availableQualities: ['1080p', '720p', '480p', '360p'],
        duration: video.duration,
        viewsCount: video.viewsCount ? Number(video.viewsCount) : 0,
        likesCount: video.likesCount ? Number(video.likesCount) : 0,
        dislikesCount: video.dislikesCount ? Number(video.dislikesCount) : 0,
        commentsCount: video.comments.length,
        publishedAt: video.createdAt.toISOString(),
        author: {
          id: video.author.id,
          username: video.author.username,
          channelName: video.author.firstName + ' ' + video.author.lastName,
          avatar: video.author.avatar,
          subscribersCount: 0,
          isVerified: true,
        },
        tags: video.tags || [],
        category: video.category ? video.category.title : 'General',
      },
    };
  }

  async updateVideo(videoId: string, userId: string, body: any) {
    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video || video.authorId !== userId) {
      throw new NotFoundException('Video topilmadi yoki ruxsat yo‘q');
    }

    await this.prisma.video.update({
      where: { id: videoId },
      data: {
        title: body.title,
        description: body.description,
        visibility: body.visibility,
      },
    });

    return { message: 'Video yangilandi' };
  }

  async deleteVideo(videoId: string, userId: string) {
    const video = await this.prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video || video.authorId !== userId) {
      throw new NotFoundException("Video topilmadi yoki ruxsat yo'q");
    }

    await this.prisma.video.delete({ where: { id: videoId } });

    return { message: "Video o'chirildi" };
  }

  async getVideoFeed(query: any) {
    const { page = 1, limit = 20, category, duration, sort } = query;
    const skip = (page - 1) * limit;

    let whereClause: any = { visibility: 'PUBLIC' };

    if (category) whereClause.categoryId = category;

    const orderBy: any = {};

    if (sort === 'popular') orderBy.viewsCount = 'desc';
    else if (sort === 'newest') orderBy.createdAt = 'desc';
    else if (sort === 'oldest') orderBy.createdAt = 'asc';

    const videos = await this.prisma.video.findMany({
      where: whereClause,
      take: Number(limit),
      skip,
      orderBy,
    });

    const serialized = videos.map((v) => ({
      ...v,
      viewsCount: v.viewsCount ? Number(v.viewsCount) : 0,
      likesCount: v.likesCount ? Number(v.likesCount) : 0,
      dislikesCount: v.dislikesCount ? Number(v.dislikesCount) : 0,
    }));

    return { success: true, data: serialized };
  }

  async searchVideos(query: string, page = 1, limit = 20) {
    const videos = await this.prisma.video.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
        visibility: 'PUBLIC',
      },
      take: Number(limit),
      skip: (page - 1) * limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const serialized = videos.map((v) => ({
      ...v,
      viewsCount: v.viewsCount ? Number(v.viewsCount) : 0,
      likesCount: v.likesCount ? Number(v.likesCount) : 0,
      dislikesCount: v.dislikesCount ? Number(v.dislikesCount) : 0,
    }));

    return { success: true, data: serialized };
  }

  async getTrendingVideos(category: string, region: string, timeframe: string) {
    const videos = await this.prisma.video.findMany({
      where: {
        visibility: 'PUBLIC',
      },
      take: 20,
      orderBy: {
        viewsCount: 'desc',
      },
    });

    const serialized = videos.map((v) => ({
      ...v,
      viewsCount: v.viewsCount ? Number(v.viewsCount) : 0,
      likesCount: v.likesCount ? Number(v.likesCount) : 0,
      dislikesCount: v.dislikesCount ? Number(v.dislikesCount) : 0,
    }));

    return { success: true, data: serialized };
  }
}
