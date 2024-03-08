import { GENDERS } from "@/constants/genders";

export function getRandomGender() {
  const random = Math.random();
  if (random < 0.5) return GENDERS.MALE;
  return GENDERS.FEMALE;
}
