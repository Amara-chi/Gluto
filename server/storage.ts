// server/storage.ts
import { User, Category, Product, Order } from './models';
import type { InsertCategory, InsertOrder, InsertProduct } from '../shared/schema';

export class DatabaseStorage {
  // ─── AUTH METHODS ────────────────────────────────

  async getUserByEmail(email: string) {
    return await User.findOne({ email }).lean();
  }

  async getUser(id: string) {
    return await User.findById(id).lean();
  }

  async createUser(data: {
    email: string;
    passwordHash: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
  }) {
    const user = new User(data);
    return await user.save(); // Important: no `.lean()` on save
  }

  async upsertUser(userData: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    isAdmin?: boolean;
    profileImageUrl?: string;
  }) {
    return await User.findByIdAndUpdate(
      userData.id,
      { ...userData, updatedAt: new Date() },
      { upsert: true, new: true }
    ).lean();
  }

  // ─── CATEGORY METHODS ─────────────────────────────

  async getCategories(): Promise<Category[]> {
    return await Category.find({ isActive: true }).sort({ name: 1 }).lean();
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return await Category.findById(id).lean();
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory = new Category(category);
    return await newCategory.save();
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category> {
    return await Category.findByIdAndUpdate(
      id,
      { ...category, updatedAt: new Date() },
      { new: true }
    ).lean();
  }

  async deleteCategory(id: string): Promise<void> {
    await Category.findByIdAndUpdate(id, { isActive: false });
  }

  // ─── PRODUCT METHODS ─────────────────────────────

  async getProducts(params: {
    categoryId?: string;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<Product[]> {
    const { categoryId, search, limit = 50, offset = 0 } = params;

    const query: any = { isActive: true };
    if (categoryId) query.categoryId = categoryId;
    if (search) query.name = { $regex: search, $options: 'i' };

    return await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .lean();
  }

  async getProductsCount(params: { categoryId?: string; search?: string } = {}): Promise<number> {
    const { categoryId, search } = params;

    const query: any = { isActive: true };
    if (categoryId) query.categoryId = categoryId;
    if (search) query.name = { $regex: search, $options: 'i' };

    return await Product.countDocuments(query);
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return await Product.findById(id).lean();
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const newProduct = new Product(product);
    return await newProduct.save();
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product> {
    return await Product.findByIdAndUpdate(
      id,
      { ...product, updatedAt: new Date() },
      { new: true }
    ).lean();
  }

  async deleteProduct(id: string): Promise<void> {
    await Product.findByIdAndUpdate(id, { isActive: false });
  }

  // ─── ORDER METHODS ───────────────────────────────

  async createOrder(order: InsertOrder): Promise<Order> {
    const newOrder = new Order(order);
    return await newOrder.save();
  }

  async getOrders(): Promise<Order[]> {
    return await Order.find().sort({ createdAt: -1 }).lean();
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return await Order.findById(id).lean();
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    return await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    ).lean();
  }
}

export const storage = new DatabaseStorage();
