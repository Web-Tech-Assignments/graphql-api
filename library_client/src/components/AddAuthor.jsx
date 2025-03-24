import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_AUTHORS, ADD_AUTHOR, DELETE_AUTHOR, UPDATE_AUTHOR, GET_BOOKS } from '../graphql/queries';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddAuthor = () => {
  const { loading, error, data, refetch: refetchAuthors } = useQuery(GET_AUTHORS);
  const { refetch: refetchBooks } = useQuery(GET_BOOKS);
  const [authorId, setAuthorId] = useState('');
  const [name, setName] = useState('');
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  const [addAuthor] = useMutation(ADD_AUTHOR, { onCompleted: () => refetchAuthors() });
  const [deleteAuthor] = useMutation(DELETE_AUTHOR, { onCompleted: () => { refetchAuthors(); refetchBooks(); } });
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, { onCompleted: () => { refetchAuthors(); refetchBooks(); } });

  const validateAuthorId = (id) => /^A([0-9]|[12][0-9]|30)$/.test(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAuthorId(authorId)) {
      alert("Invalid Author ID! It should start with 'A' followed by a number (e.g., A1, A2).");
      return;
    }
    if (data.authors.some((author) => author.authorId === authorId)) {
      alert('Author ID already exists! Please enter a unique ID.');
      return;
    }
    await addAuthor({ variables: { authorId, name } });
    setAuthorId('');
    setName('');
  };

  const handleDelete = async (authorId) => {
    await deleteAuthor({ variables: { authorId } });
  };

  const handleUpdate = async (authorId) => {
    if (updatedName.trim() === '') return;
    await updateAuthor({ variables: { authorId, name: updatedName } });
    setEditingAuthor(null);
  };

  if (loading) return <p className="text-center">Loading authors...</p>;
  if (error) return <p className="text-center text-danger">Error loading authors</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <div className="text-center mb-4">
          <h1 className="display-6 fw-bold text-primary">✍️ Manage Authors</h1>
          <p className="text-muted">Effortlessly add and manage author records</p>
        </div>

        {/* <h2 className="mb-3 text-primary text-center">Manage Authors</h2> */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row mb-3">
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Author ID (e.g., A1)" value={authorId} onChange={(e) => setAuthorId(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" placeholder="Author Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success w-50">Add Author</button>
          </div>
        </form>

        <h3 className="text-secondary text-center">Author List</h3>
        <ul className="list-group">
          {data.authors.map((author) => (
            <li key={author.authorId} className="list-group-item d-flex justify-content-between align-items-center">
              {editingAuthor === author.authorId ? (
                <div className="d-flex w-100 gap-2">
                  <input type="text" className="form-control" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                  <button className="btn btn-primary" onClick={() => handleUpdate(author.authorId)}>Save</button>
                  <button className="btn btn-secondary" onClick={() => setEditingAuthor(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <span className="fw-bold">{author.authorId} - {author.name}</span>
                  <div>
                    <button className="btn btn-warning me-2" onClick={() => { setEditingAuthor(author.authorId); setUpdatedName(author.name); }}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(author.authorId)}>Delete</button>
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

export default AddAuthor;
