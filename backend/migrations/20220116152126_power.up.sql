CREATE TABLE "power" (
    "id" SERIAL NOT NULL, 
    "date" TIMESTAMP NOT NULL, 
    "kwh" float4 NOT NULL, 
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
     CONSTRAINT "PK_9b965296b9f26727d54a5a0620e" PRIMARY KEY ("id")
);

SELECT sqlx_manage_updated_at('power');