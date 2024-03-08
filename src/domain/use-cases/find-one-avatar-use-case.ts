import type { Gender } from "@/constants/genders";
import type { AvatarRepository } from "../repositories/avatar-repository";

export function findOneAvatarUseCase(avatarRepository: AvatarRepository) {
  return async function execute(key: string, gender: Gender) {
    return avatarRepository.findUnique(key, gender);
  };
}
