-- CreateTable
CREATE TABLE "avatars" (
    "key" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "avatars_pkey" PRIMARY KEY ("key","gender")
);
