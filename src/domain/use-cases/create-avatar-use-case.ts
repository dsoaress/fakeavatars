import { AVATARS_BY_GENDER } from "@/constants/avatars-by-gender";
import type { AvatarCDNGateway } from "../gateways/avatar-cdn-gateway";
import type { AvatarModel } from "../models/avatar-model";
import type { AvatarRepository } from "../repositories/avatar-repository";

export function createAvatarUseCase(
  avatarRepository: AvatarRepository,
  avatarCDNGateway: AvatarCDNGateway
) {
  return async function execute(avatar: Omit<AvatarModel, "path">) {
    const path = await avatarCDNGateway.getPath(
      String(Math.floor(Math.random() * AVATARS_BY_GENDER[avatar.gender]) || 1),
      avatar.gender
    );
    return avatarRepository.create({ ...avatar, path });
  };
}
