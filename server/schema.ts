// shared/schema.ts
import { z } from 'zod'; // Make sure to install: npm install zod

export const insertCategorySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const insertProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  categoryId: z.number(),
});

export const insertOrderSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  companyName: z.string().optional(),
  positionTitle: z.string().optional(),
  address: z.string().optional(),
  inquiryPriority: z.string().optional(),
  items: z.array(z.object({
    productId: z.number(),
    productName: z.string(),
    quantity: z.number(),
    price: z.number(),
  })),
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;