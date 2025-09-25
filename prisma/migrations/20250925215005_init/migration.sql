-- CreateTable
CREATE TABLE "public"."Pet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vaccines" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "manufactureDate" TIMESTAMP(3) NOT NULL,
    "batchNumber" VARCHAR(191) NOT NULL,
    "manufacturer" VARCHAR(191) NOT NULL,

    CONSTRAINT "Vaccines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Veterinarians" (
    "id" SERIAL NOT NULL,
    "crmv" VARCHAR(191) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Veterinarians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vaccinations" (
    "id" SERIAL NOT NULL,
    "nextDate" TIMESTAMP(3) NOT NULL,
    "petId" INTEGER NOT NULL,
    "veterinarianId" INTEGER NOT NULL,

    CONSTRAINT "Vaccinations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Vaccinations" ADD CONSTRAINT "Vaccinations_petId_fkey" FOREIGN KEY ("petId") REFERENCES "public"."Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vaccinations" ADD CONSTRAINT "Vaccinations_veterinarianId_fkey" FOREIGN KEY ("veterinarianId") REFERENCES "public"."Veterinarians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
