ALTER TABLE "Service"
    ADD COLUMN "category" TEXT NOT NULL DEFAULT 'Plomberie',
    ADD COLUMN "featured" BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN "priceLabel" TEXT,
    ADD COLUMN "prestations" TEXT;
