CREATE TABLE "water" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "cubicmeter" float4 NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT "PK_8fe16d29fb45be6c0de0b2ed6a3" PRIMARY KEY ("id")
);

SELECT sqlx_manage_updated_at('water');