import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      reqired: true,
    },

    publishedYear: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const book = mongoose.model("book", bookSchema);
