-- CreateTable
CREATE TABLE "Feed" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "queryParams" JSONB NOT NULL,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "filterParams" JSONB NOT NULL,

    CONSTRAINT "Filter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adBreaks" (
    "mediaId" TEXT NOT NULL,
    "markers" JSONB NOT NULL,

    CONSTRAINT "adBreaks_pkey" PRIMARY KEY ("mediaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feed_path_key" ON "Feed"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Filter_name_key" ON "Filter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "adBreaks_mediaId_key" ON "adBreaks"("mediaId");
