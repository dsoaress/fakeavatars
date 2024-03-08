import { createAvatarUseCase } from "@/domain/use-cases/create-avatar-use-case";
import { findOneAvatarUseCase } from "@/domain/use-cases/find-one-avatar-use-case";
import { getRandomGender } from "@/lib/get-random-gender";
import { apiSearchParamsSchema } from "@/lib/api-search-params-schema";
import { Gender } from "@/constants/genders";
import { AVATARS_BY_GENDER } from "@/constants/avatars-by-gender";

import { prismaAvatarRepository } from "../database/prisma/prisma-avatar-repository";
import { prismaService } from "../database/prisma/prisma-service";
import { cloudinaryAvatarCDNGateway } from "../gateways/cloudinary-avatar-cdn-gateway";

const avatarRepository = prismaAvatarRepository(prismaService);
const avatarCDNGateway = cloudinaryAvatarCDNGateway();
const createAvatar = createAvatarUseCase(avatarRepository, avatarCDNGateway);
const findOneAvatar = findOneAvatarUseCase(avatarRepository);

export async function getAvatarController(request: Request) {
  const { searchParams } = new URL(request.url);

  const params = {
    key: searchParams.get("key") || undefined,
    size: searchParams.get("size") || undefined,
    gender: searchParams.get("gender") || getRandomGender(),
  };

  const parsedData = apiSearchParamsSchema.safeParse(params);

  if (!parsedData.success) {
    return Response.json({ error: parsedData.error.issues }, { status: 400 });
  }

  const { key, size, gender } = parsedData.data;
  let path: string | null = null;

  if (key) path = await findOneAvatar(key, gender as Gender).then((a) => a?.path || null);
  if (key && !path) {
    path = await createAvatar({ key, gender: gender as Gender }).then((a) => a.path);
  }
  if (!path) {
    path = await cloudinaryAvatarCDNGateway().getPath(
      String(Math.floor(Math.random() * AVATARS_BY_GENDER[gender as Gender]) || 1),
      gender as Gender
    );
  }

  try {
    const avatar = await avatarCDNGateway.getAvatar(path, size);
    return new Response(avatar);
  } catch (error) {
    return Response.json({ error: "An error occurred while fetching the avatar" }, { status: 500 });
  }
}
