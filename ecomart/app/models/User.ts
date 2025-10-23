import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  entryNumber?: string;
  location?: string;
  bio?: string;
  profileImage?: string;
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  entryNumber: String,
  location: String,
  bio: String,
  profileImage: String,
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
