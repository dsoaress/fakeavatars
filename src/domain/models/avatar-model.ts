import type { Gender } from "@/constants/genders";

export interface AvatarModel {
  key: string;
  gender: Gender;
  path: string;
}
