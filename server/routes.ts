//server/routes.ts-

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { login, register, setCurrentUser, getCurrentUser, authenticate } from './auth';

import { insertCategorySchema, insertProductSchema, insertOrderSchema } from "./schema";


export async function registerRoutes(app: Express): Promise<Server> {

// Add this route handler
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    setCurrentUser(user);
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await register(email, password);
    setCurrentUser(user);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/auth/me', (req, res) => {
  const user = getCurrentUser();
  if (!user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json(user);
});
  app.get('/api/auth/user', authenticate, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public routes - Categories
  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Public routes - Products
  app.get('/api/products', async (req, res) => {
    try {
      const { categoryId, search, page = 1, limit = 12 } = req.query;
      const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
      
      const products = await storage.getProducts({
        categoryId: categoryId ? parseInt(categoryId as string) : undefined,
        search: search as string,
        limit: parseInt(limit as string),
        offset,
      });
      
      const total = await storage.getProductsCount({
        categoryId: categoryId ? parseInt(categoryId as string) : undefined,
        search: search as string,
      });
      
      res.json({
        products,
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get('/api/products/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProductById(parseInt(id));
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Public route - Place order
  app.post('/api/orders', async (req, res) => {
    try {
      const validatedOrder = insertOrderSchema.parse(req.body);
      
      // Calculate total amount
      const items = validatedOrder.items as any[];
      const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const order = await storage.createOrder({
        ...validatedOrder,
        totalAmount: totalAmount.toString(),
      });

      // Send email notifications
      await sendOrderEmails(order, items);
      
      res.json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Protected admin routes - Categories
  app.get('/api/admin/categories', authenticate, async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post('/api/admin/categories', authenticate, async (req, res) => {
    try {
      const validatedCategory = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedCategory);
      res.json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  app.put('/api/admin/categories/:id', authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedCategory = insertCategorySchema.partial().parse(req.body);
      const category = await storage.updateCategory(parseInt(id), validatedCategory);
      res.json(category);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Failed to update category" });
    }
  });

  app.delete('/api/admin/categories/:id', authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteCategory(parseInt(id));
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  // Protected admin routes - Products
  app.get('/api/admin/products', authenticate, async (req, res) => {
    try {
      const { categoryId, search, page = 1, limit = 50 } = req.query;
      const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
      
      const products = await storage.getProducts({
        categoryId: categoryId ? parseInt(categoryId as string) : undefined,
        search: search as string,
        limit: parseInt(limit as string),
        offset,
      });
      
      const total = await storage.getProductsCount({
        categoryId: categoryId ? parseInt(categoryId as string) : undefined,
        search: search as string,
      });
      
      res.json({
        products,
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post('/api/admin/products', authenticate, async (req, res) => {
    try {
      const validatedProduct = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedProduct);
      res.json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put('/api/admin/products/:id', authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedProduct = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(parseInt(id), validatedProduct);
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete('/api/admin/products/:id', authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteProduct(parseInt(id));
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Protected admin routes - Orders
  app.get('/api/admin/orders', authenticate, async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.put('/api/admin/orders/:id/status', authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await storage.updateOrderStatus(parseInt(id), status);
      res.json(order);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Email notification function
async function sendOrderEmails(order: any, items: any[]) {
  try {
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || process.env.SMTP_USER || 'admin@glutointernational.com',
        pass: process.env.EMAIL_PASS || process.env.SMTP_PASS || 'defaultpass',
      },
    });

    const itemsList = items.map(item => 
      `- ${item.productName} (Quantity: ${item.quantity}, Price: $${item.price})`
    ).join('\n');

    const emailContent = `
New Order Received - Order #${order.id}

Customer Information:
- Name: ${order.fullName}
- Position: ${order.positionTitle}
- Company: ${order.companyName}
- Email: ${order.email}
- Phone: ${order.phoneNumber}
- Address: ${order.address}
- Priority: ${order.inquiryPriority}

Order Items:
${itemsList}

Total Amount: $${order.totalAmount}

Order placed at: ${new Date(order.createdAt).toLocaleString()}
    `;

    // Send to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'admin@glutointernational.com',
      to: process.env.ADMIN_EMAIL || 'admin@glutointernational.com',
      subject: `New Order #${order.id} - ${order.companyName}`,
      text: emailContent,
    });

    // Send confirmation to customer
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'admin@glutointernational.com',
      to: order.email,
      subject: `Order Confirmation #${order.id} - GLUTO INTERNATIONAL`,
      text: `Dear ${order.fullName},

Thank you for your order with GLUTO INTERNATIONAL. We have received your inquiry and will process it according to your specified priority level (${order.inquiryPriority}).

${emailContent}

We will contact you shortly to confirm the details and provide further information.

Best regards,
GLUTO INTERNATIONAL Team`,
    });

    console.log('Order emails sent successfully');
  } catch (error) {
    console.error('Error sending order emails:', error);
  }
}
