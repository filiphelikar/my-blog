import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isApproved: boolean("is_approved").default(false),
});
