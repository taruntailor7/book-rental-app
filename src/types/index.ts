export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface Book {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  price: number;
  imageUrl?: string;
  description?: string;
}

export interface Rental {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  bookId: number;
  bookTitle: string;
  bookPrice: number;
  bookImageUrl?: string;
  bookDescription?: string;
}