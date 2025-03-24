import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, GET_AUTHORS } from '../graphql/queries';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddBook = () => {
  const { loading, error, data, refetch: refetchBooks } = useQuery(GET_BOOKS);
  const { data: authorsData } = useQuery(GET_AUTHORS);
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');

  const [addBook] = useMutation(ADD_BOOK, { onCompleted: () => refetchBooks() });
  const [deleteBook] = useMutation(DELETE_BOOK, { onCompleted: () => refetchBooks() });
  const [updateBook] = useMutation(UPDATE_BOOK, { onCompleted: () => refetchBooks() });

  const validateBookId = (id) => /^B([0-9]|[12][0-9]|30)$/.test(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateBookId(bookId)) {
      alert("Invalid Book ID! It should start with 'B' followed by a number (e.g., B1, B2).");
      return;
    }
    if (data.books.some((book) => book.bookId === bookId)) {
      alert('Book ID already exists! Please enter a unique ID.');
      return;
    }
    await addBook({ variables: { bookId, title, authorId } });
    setBookId('');
    setTitle('');
    setAuthorId('');
  };

  const handleDelete = async (bookId) => {
    await deleteBook({ variables: { bookId } });
  };

  const handleUpdate = async (bookId) => {
    if (updatedTitle.trim() === '') return;
    await updateBook({ variables: { bookId, title: updatedTitle } });
    setEditingBook(null);
  };

  if (loading) return <p className="text-center">Loading books...</p>;
  if (error) return <p className="text-center text-danger">Error loading books</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
      <div className="text-center mb-4">
        <h1 className="display-6 fw-bold text-info">📖 Manage Books</h1>
        <p className="text-muted">Keep track of your book collection seamlessly</p>
      </div>

        {/* <h2 className="mb-3 text-primary text-center">Manage Books</h2> */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row mb-3">
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Book ID (e.g., B1)" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <input type="text" className="form-control" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="col-md-4">
              <select className="form-control" value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
                <option value="">Select Author</option>
                {authorsData?.authors.map((author) => (
                  <option key={author.authorId} value={author.authorId}>{author.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success w-50">Add Book</button>
          </div>
        </form>

        <h3 className="text-secondary text-center">Book List</h3>
        <ul className="list-group">
          {data.books.map((book) => (
            <li key={book.bookId} className="list-group-item d-flex justify-content-between align-items-center">
              {editingBook === book.bookId ? (
                <div className="d-flex w-100 gap-2">
                  <input type="text" className="form-control" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                  <button className="btn btn-primary" onClick={() => handleUpdate(book.bookId)}>Save</button>
                  <button className="btn btn-secondary" onClick={() => setEditingBook(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <span className="fw-bold">{book.bookId} - {book.title} (by {book.author.name})</span>
                  <div>
                    <button className="btn btn-warning me-2" onClick={() => { setEditingBook(book.bookId); setUpdatedTitle(book.title); }}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(book.bookId)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddBook;
