set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "series" (
  "seriesId" serial PRIMARY KEY,
  "name" varchar(50),
  "imageUrl" varchar(255)
);


CREATE TABLE "smiskis" (
  "smiskisId" serial PRIMARY KEY,
  "seriesId" int,
  "bodyType" varchar(50),
  "pose" varchar(50),
  "found" varchar(100),
  "description" text,
   "imageUrl" varchar(255)
);

CREATE TABLE "shoppingCartItems" (
  "shoppingCartItemsId" serial PRIMARY KEY,
  "seriesId" int,
  "quantity" int,
  "imageUrl" varchar(255),
  "createdAt" timestamp NOT NULL DEFAULT (now())
);


ALTER TABLE "smiskis" ADD FOREIGN KEY ("seriesId") REFERENCES "series" ("seriesId");


ALTER TABLE "shoppingCartItems" ADD FOREIGN KEY ("seriesId") REFERENCES "series" ("seriesId");





