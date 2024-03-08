import { getAvatarController } from "@/infra/controllers/get-avatar-controller";

export async function GET(request: Request) {
  return getAvatarController(request);
}
