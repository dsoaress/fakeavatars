import type { PrismaClient } from "@prisma/client";

import type { Gender } from "@/constants/genders";
import type { AvatarRepository } from "@/domain/repositories/avatar-repository";
import type { AvatarModel } from "@/domain/models/avatar-model";

export function prismaAvatarRepository(prismaService: PrismaClient): AvatarRepository {
  return {
    findUnique: async (key: string, gender: Gender) =>
      prismaService.avatar.findUnique({
        where: { key_gender: { key, gender } },
      }) as Promise<AvatarModel | null>,
    create: async (avatar: AvatarModel) => {
      return prismaService.avatar.create({
        data: avatar,
      }) as Promise<AvatarModel>;
    },
  };
}
