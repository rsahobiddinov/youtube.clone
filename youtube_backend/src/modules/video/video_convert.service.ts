import { Injectable } from '@nestjs/common';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';
import ffmpegPath from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import { VideoResolution } from './types';

@Injectable()
class VideoConvertService {
  constructor() {
    ffmpeg.setFfprobePath(ffprobeInstaller.path);
    ffmpeg.setFfmpegPath(ffmpegPath as unknown as string);
  }

  getVideoResolution(videoPath: string): Promise<VideoResolution> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) return reject(err);
        const videoStream = metadata.streams.find(
          (s) => s.codec_type === 'video',
        );
        if (!videoStream || typeof videoStream.height !== 'number') {
          return reject(new Error('Could not determine video resolution'));
        }
        resolve({ width: videoStream.width, height: videoStream.height });
      });
    });
  }

  convertToResolutions(
    inputPath: string,
    outputBasePath: string,
    resolutions: { height: number }[],
  ): Promise<string>[] {
    return resolutions.map((res: { height: number }) => {
      return new Promise((resolve, reject) => {
        const output = `${outputBasePath}/${res.height}p.mp4`;
        ffmpeg(inputPath)
          .videoCodec('libx264')
          .size(`?x${res.height}`)
          .outputOptions(['-preset fast', '-crf 23', '-movflags +faststart'])
          .on('end', () => {
            console.log(`✅ ${res.height}p created.`);
            resolve('ok');
          })
          .on('progress', (progress) => {
            const progressMonitor = `${Math.floor(progress.percent as number)}%`;
            console.log(progressMonitor);
          })
          .on('error', (err) => {
            console.error(`❌ Error at ${res.height}p:`, err);
            reject(err);
          })
          .save(output);
      });
    });
  }

  getDuration(videoPath: string): Promise<number> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) return reject(err);
        const duration = metadata.format.duration;
        if (typeof duration !== 'number' || isNaN(duration)) {
          return reject(new Error('Could not determine video duration'));
        }
        resolve(Math.floor(duration));
      });
    });
  }

  getChunkProps(
    range: string,
    fileSize: number,
  ): { start: number; end: number; chunkSize: number } {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const maxChunkSize = Math.floor(4 * 1024 * 1024);

    if (end - start + 1 > maxChunkSize) {
      end = start + maxChunkSize - 1;
    }
    const chunkSize = end - start + 1;
    return {
      start,
      end,
      chunkSize,
    };
  }
}

export default VideoConvertService;