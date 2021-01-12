-- CreateTable
CREATE TABLE "Power" (
"id" SERIAL,
    "date" TIMESTAMP(3) NOT NULL,
    "kwh" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Water" (
"id" SERIAL,
    "date" TIMESTAMP(3) NOT NULL,
    "cubicmeter" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oil" (
"id" SERIAL,
    "date" TIMESTAMP(3) NOT NULL,
    "filled" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
