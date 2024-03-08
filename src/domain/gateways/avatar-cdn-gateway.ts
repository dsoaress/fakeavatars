import type { Gender } from "@/constants/genders";

export interface AvatarCDNGateway {
  getPath: (key: string, gender: Gender) => Promise<string>;
  getAvatar: (path: string, size: number) => Promise<Blob>;
}
