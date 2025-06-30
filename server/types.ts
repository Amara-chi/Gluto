export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface UpsertUser extends Omit<User, 'createdAt' | 'updatedAt'> {}
  
  export interface Category {
    _id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface InsertCategory extends Omit<Category, '_id' | 'createdAt' | 'updatedAt'> {}
  
  export interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    categoryId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface InsertProduct extends Omit<Product, '_id' | 'createdAt' | 'updatedAt'> {}
  
  export interface Order {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    companyName?: string;
    positionTitle?: string;
    address?: string;
    inquiryPriority?: string;
    items: Array<{
      productId: string;
      productName: string;
      quantity: number;
      price: number;
    }>;
    totalAmount: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface InsertOrder extends Omit<Order, '_id' | 'createdAt' | 'updatedAt' | 'status'> {}