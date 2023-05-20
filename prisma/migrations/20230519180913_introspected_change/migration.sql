-- CreateTable
CREATE TABLE "providers" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT[],
    "services" TEXT[],
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "nostr" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "onchain_accepted" BOOLEAN,
    "lightning_accepted" BOOLEAN,
    "description" TEXT,
    "profile_url" TEXT,
    "languages" TEXT[],
    "name" TEXT,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers_intermediate" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT[],
    "services" TEXT[],
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "nostr" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "onchain_accepted" BOOLEAN,
    "lightning_accepted" BOOLEAN,
    "description" TEXT,
    "profile_url" TEXT,
    "languages" TEXT[],
    "name" TEXT,

    CONSTRAINT "providers_intermediate_pkey" PRIMARY KEY ("id")
);
