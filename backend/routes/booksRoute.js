import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//add a book
router.post("/book", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedYear
    ) {
      return response.status(400).send({ message: "send all required fields" });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishedYear: request.body.publishedYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all books
router.get("/book", async (request, response) => {
  try {
    const book = await Book.find({});
    return response.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    console.log(error.message);
    response.status(501).send({ message: error.message });
  }
});

//find one book by id
router.get("/book/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(502).send({ message: error.message });
  }
});

//update a book by id
router.put("/book/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishedYear
    ) {
      return response.status(400).send({ message: "required all fields" });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "book not found" });
    }
    return response.status(200).send({ message: "book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(503).send({ message: error.message });
  }
});

//delete a book by id

router.delete("/book/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "book not found" });
    }
    return response.status(200).send({ message: "book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(504).send({ message: error.message });
  }
});

export default router;
