CREATE TABLE "oil" (
    "id" SERIAL NOT NULL, 
    "date" TIMESTAMP NOT NULL, 
    "filled" float4 NOT NULL, 
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
    CONSTRAINT "PK_7687c431233413581eb1c765504" PRIMARY KEY ("id")
);

SELECT sqlx_manage_updated_at('oil');