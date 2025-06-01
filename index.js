const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

let books = [
  { id : 1, title: '1984', author: 'George Orwell' },
  { id : 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id : 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
]
// GET all books
app.get('/books' , (req, res) => {
  res.json(books);
});
// POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length ? books[books.length -1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT to update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const {title, author} = req.body;
  const book = books.find(b => b.id === bookId);

  if (!book)
    return res.status(404).json({ message : 'Book not found'});

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE to remove a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1)
    return res.status(404).json({ message : 'Book not found' });

  const deletedBook = books.splice(index,1 );
  res.json(deletedBook[0]);
})