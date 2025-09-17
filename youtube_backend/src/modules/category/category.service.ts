import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(title: string) {
    return this.prisma.category.create({
      data: { title },
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: { videos: true },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { videos: true },
    });

    if (!category) {
      throw new NotFoundException('Kategoriya topilmadi');
    }
    return category;
  }

  async update(id: string, title?: string) {
    return this.prisma.category.update({
      where: { id },
      data: { title },
    });
  }

  async remove(id: string) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
