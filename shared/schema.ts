import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define interface for attached files
export interface AttachedFile {
  originalName: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
}

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const orderStatusEnum = pgEnum("order_status", [
  "new",
  "in_review", 
  "in_progress",
  "delivered",
  "closed"
]);

export const automationTypeEnum = pgEnum("automation_type", [
  "whatsapp_chatbot",
  "crm_integration", 
  "email_automation",
  "file_sync",
  "custom_workflow"
]);

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: text("order_id").notNull().unique(),
  
  // Step 1: Project basics
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  projectName: text("project_name").notNull(),
  
  // Step 2: Automation type
  automationType: automationTypeEnum("automation_type").notNull(),
  customDescription: text("custom_description"),
  
  // Step 3: Integrations
  integrations: text("integrations").array(),
  hasCredentials: jsonb("has_credentials"),
  
  // Step 4: Files
  attachedFiles: jsonb("attached_files"),
  exampleLink: text("example_link"),
  
  // Step 5: Timeline
  deliverySpeed: text("delivery_speed"),
  priorityNotes: text("priority_notes"),
  
  // Admin fields
  status: orderStatusEnum("status").default("new"),
  adminNotes: text("admin_notes"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  orderId: true,
  status: true,
  adminNotes: true,
  createdAt: true,
  updatedAt: true,
});

export const updateOrderSchema = createInsertSchema(orders).pick({
  status: true,
  adminNotes: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
