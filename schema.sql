-- Add new schema named "public"
CREATE SCHEMA IF NOT EXISTS "public";
-- Create "items" table
CREATE TABLE "public"."items" ("item_id" integer NOT NULL GENERATED ALWAYS AS IDENTITY, "name" text NOT NULL, "description" text NOT NULL, PRIMARY KEY ("item_id"));
-- Create enum type "gender_type"
CREATE TYPE "public"."gender_type" AS ENUM ('M', 'F', 'Other');
-- Create "survivors" table
CREATE TABLE "public"."survivors" ("survivor_id" integer NOT NULL GENERATED ALWAYS AS IDENTITY, "name" text NOT NULL, "birthday" timestamptz NOT NULL, "gender" "public"."gender_type" NOT NULL, "last_location" point NULL, "infected" boolean NOT NULL, "deleted_at" timestamptz NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NULL, PRIMARY KEY ("survivor_id"));
-- Create "survivors_items" table
CREATE TABLE "public"."survivors_items" ("survivor_id" integer NOT NULL, "item_id" integer NOT NULL, "quantity" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NULL, PRIMARY KEY ("survivor_id", "item_id"), CONSTRAINT "survivors_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."items" ("item_id") ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT "survivors_items_survivor_id_fkey" FOREIGN KEY ("survivor_id") REFERENCES "public"."survivors" ("survivor_id") ON UPDATE NO ACTION ON DELETE NO ACTION);
-- Create "trades" table
CREATE TABLE "public"."trades" ("trade_id" uuid NOT NULL DEFAULT gen_random_uuid(), "item_id" integer NOT NULL, "quantity" integer NOT NULL, "from_survivor_id" integer NOT NULL, "to_survivor_id" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("trade_id"), CONSTRAINT "trades_from_survivor_id_fkey" FOREIGN KEY ("from_survivor_id") REFERENCES "public"."survivors" ("survivor_id") ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT "trades_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."items" ("item_id") ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT "trades_to_survivor_id_fkey" FOREIGN KEY ("to_survivor_id") REFERENCES "public"."survivors" ("survivor_id") ON UPDATE NO ACTION ON DELETE NO ACTION);
