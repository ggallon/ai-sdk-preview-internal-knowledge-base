import type { Message } from "ai";
import {
  pgTable,
  varchar,
  text,
  real,
  timestamp,
  json,
} from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  email: varchar("email", { length: 64 }).primaryKey().notNull(),
  password: varchar("password", { length: 64 }),
});

export const chat = pgTable("Chat", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("createdAt").notNull(),
  messages: json("messages").notNull(),
  author: varchar("author", { length: 64 })
    .notNull()
    .references(() => user.email),
});

export const chunk = pgTable("Chunk", {
  id: text("id").primaryKey().notNull(),
  filePath: text("filePath").notNull(),
  content: text("content").notNull(),
  embedding: real("embedding").array().notNull(),
});

export type Chat = Omit<typeof chat.$inferSelect, "messages"> & {
  messages: Message[];
};

export type Chunk = typeof chunk.$inferSelect;
