import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export interface Blog {
  id?: number;
  title: string;
  content: string[]; 
  author: string;
  createdAt: Date;
  isApproved?: boolean;
  imageUrl: string;
}

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").array().notNull(), 
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isApproved: boolean("is_approved").default(false),
  imageUrl: text("image_url").notNull(),
});
