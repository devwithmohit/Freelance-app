import mongoose, { Schema, Document } from "mongoose";

// Interface for a message document in MongoDB
export interface Messages extends Document {
  content: string;
  createdAt: Date;
}

// Mongoose schema for the Messages collection
const MessagesSchema: Schema<Messages> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  message: Messages[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    // use regex
    match: [/\S+@\S+\.\S+/, "please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, " Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, " Verify code Expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  message: [MessagesSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
