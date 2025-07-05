CREATE TABLE IF NOT EXISTS "survey_responses" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"team_member_name" text NOT NULL,
	"response_content" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "survey_responses" ADD CONSTRAINT "survey_responses_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
