import { Schema, Document } from 'mongoose';

export const CatSchema = new Schema(
  {
    name: String,
    birthdate: String,
    email: String,
    age: Number,
    username: { type: String, required: true },
    password: { type: String, required: true },
    liked_posts: [{ type: String, ref: Schema.Types.ObjectId }],
  },
  { timestamps: true },
);

export interface Cat extends Document {
  readonly name: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly age: number;
  readonly username: string;
  readonly password: string;
  readonly liked_posts: string;
}
