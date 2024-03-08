import cloudinary from "cloudinary";

import type { AvatarCDNGateway } from "@/domain/gateways/avatar-cdn-gateway";
import sharp from "sharp";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function cloudinaryAvatarCDNGateway(): AvatarCDNGateway {
  return {
    getPath: async (key, gender) => {
      const path = `avatars/${gender}/${key}`;
      return cloudinary.v2.api.resource(path).then((response) => response.secure_url);
    },
    getAvatar: async (path, size) => {
      return fetch(path)
        .then(async (response) => {
          if (response.ok) {
            const blob = await response.blob();
            const resized = await sharp(await blob.arrayBuffer())
              .resize(size)
              .toBuffer();
            return new Blob([resized], { type: "image/png" });
          } else throw new Error("An error occurred while fetching the avatar");
        })
        .catch((error) => {
          throw new Error(`An error occurred while fetching the avatar: ${error}`);
        }) as Promise<Blob>;
    },
  };
}
