import mongoose from "mongoose";
const Schema = mongoose.Schema;


const hairColors = [
  "black",
  "brown",
  "blonde",
  "platinum",
  "grey",
  "red",
]

const hairLengths = [
  "short",
  "medium",
  "long",
];

const hairTypes = [
  "straight",
  "wavy",
  "curly",
  "coily"
];

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    default: null
  },
  code: {
    type: String,
    default: null,
  },
  codeExpires: {
    type: Date,
    default: null,
  },
  faceShape: {
    type: String,
    default: null,
  },
  preferredHairColors: {
    type: [String],
    enum: hairColors,
    default: [],
  },
  preferredHairLengths: {
    type: [String],
    enum: hairLengths,
    default: [],
  },
  preferredHairTypes: {
    type: [String],
    enum: hairTypes,
    default: [],
  },
  wishlists: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
  code?: string;
  codeExpires?: Date;
  faceShape?: string;
  preferredHairColors?: string[];
  preferredHairLengths?: string[];
  preferredHairStyles?: string[];
}

export default mongoose.model('users', UserSchema);