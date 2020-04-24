import { Schema, Document } from 'mongoose';

export const CatSchema = new Schema(
  {
    name: String,
    birthdate: String,
    knownBirthdate: Boolean,
    coat: [{ type: String }],
    tatooed: Boolean,
    tatoo: String,
    microchip: Boolean,
    fiv: Boolean,
    status: {
      type: String,
      enum: ['TOADOPT', 'HOSTFAMILY', 'ADOPTED', 'DEAD'],
      default: 'TOADOPT',
    },
  },
  { timestamps: true },
);

export interface Cat extends Document {
  readonly name: string;
  readonly birthdate: string;
  readonly knownBirthdate: boolean;
  readonly coat: string;
  readonly tatooed: boolean;
  readonly tatoo: number;
  readonly microchip: boolean;
  readonly fiv: boolean;
  readonly status: string;
}
