import { Schema, model, models, Model, Document } from "mongoose";
import mongoose from "mongoose";

// User model
export interface IUserLogin extends Document {
  email: string;
  role: 'user' | 'author' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

const userLoginSchema = new Schema<IUserLogin>(
  {
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'author', 'admin'], default: 'user' },
  },
  {
    timestamps: true,
  }
);

// Card model
export interface ICard extends Document {
  title: string;
  description: string;
  price: number;
  circle: string;
  releaseDate: Date;
  category: string;
  imageUrl: string;
  stock: number;
  author: string; // email of the author
  collectionId?: string; // reference to collection
  createdAt?: Date;
  updatedAt?: Date;
}

const cardSchema = new Schema<ICard>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    circle: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    author: { type: String, required: true },
    collectionId: { type: String },
  },
  {
    timestamps: true,
  }
);

// Collection model
export interface ICollection extends Document {
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  isActive: boolean;
  circle: string;
  stamps: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const collectionSchema = new Schema<ICollection>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    circle: { type: String, required: true },
    stamps: { type: [String], default: [] }
  },
  {
    timestamps: true,
  }
);

export const UserLogin: Model<IUserLogin> = models.UserLogin || model<IUserLogin>("UserLogin", userLoginSchema);
export const Card = mongoose.models.Card || mongoose.model<ICard>("Card", cardSchema);
export const Collection = mongoose.models.Collection || mongoose.model<ICollection>("Collection", collectionSchema);

export interface IPost extends Document {
  title: string;
  content: string;
  author: string; // email of the author
  excerpt: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    excerpt: { type: String, required: true },
    published: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Post: Model<IPost> =
  models.Post || model<IPost>("Post", postSchema);

const depositAccountSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, required: true, default: 0 },
  totalDeposits: { type: Number, required: true, default: 0 },
  totalSpent: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true, enum: ['deposit', 'withdrawal', 'purchase'] },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  items: { type: Array, default: [] }
})

export const DepositAccount = mongoose.models.DepositAccount || mongoose.model('DepositAccount', depositAccountSchema)
export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  orderNumber: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  items: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    imageUrl: String
  }],
  createdAt: { type: Date, default: Date.now }
})

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  condition: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  seller: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["available", "sold"],
    default: "available",
  },
}, {
  timestamps: true,
});

export const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);

const discussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: String,
  },
  images: [{
    type: String,
  }],
  comments: [{
    content: {
      type: String,
      required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      image: String,
    },
    images: [{
      type: String,
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  tags: [{
    type: String,
  }],
}, {
  timestamps: true,
});

export const Discussion = mongoose.models.Discussion || mongoose.model("Discussion", discussionSchema);

const notificationSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['info', 'success', 'warning', 'error'], default: 'info' },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  userId: { type: String, required: true }
})

export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)

const supportTicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['open', 'in_progress', 'resolved'], default: 'open' },
  replies: [{
    message: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
})

export const SupportTicket = mongoose.models.SupportTicket || mongoose.model('SupportTicket', supportTicketSchema)

const cancellationSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  circle: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export const Cancellation = mongoose.models.Cancellation || mongoose.model('Cancellation', cancellationSchema)

export async function PUT(request: Request, context: { params: { id: string } }) {
  const { id } = context.params
}


