import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS, DELETE_BOOK } from '../graphql/queries';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookList = () => {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, { onCompleted: () => refetch() });

  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook({ variables: { bookId } });
    }
  };

  if (loading) return <p className="text-center">Loading books...</p>;
  if (error) return <p className="text-center text-danger">Error loading books</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="fw-bold text-dark text-center mt-4">📋 Book List</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover mt-3">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.books.map((book, index) => (
                <tr key={book.bookId}>
                  <td>{index + 1}</td>
                  <td className="fw-bold">{book.bookId}</td>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(book.bookId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.books.length === 0 && <p className="text-center text-muted">No books available.</p>}
      </div>
    </div>
  );
};

export default BookList;
