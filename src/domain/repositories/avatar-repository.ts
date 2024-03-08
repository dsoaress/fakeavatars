import type { Gender } from "@/constants/genders";
import type { AvatarModel } from "../models/avatar-model";

export interface AvatarRepository {
  findUnique: (key: string, gender: Gender) => Promise<AvatarModel | null>;
  create: (avatar: AvatarModel) => Promise<AvatarModel>;
}
