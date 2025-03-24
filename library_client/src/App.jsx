import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import AddAuthor from './components/AddAuthor';
import AddBook from './components/AddBook';
import BookList from './components/BookList';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container mt-4">
        <div className="text-center mb-4">
          <h1 className="display-5 fw-bold text-primary">📚 GraphQL Library</h1>
          <p className="text-muted">Manage your books and authors efficiently</p>
        </div>
        <div className="row">
          <div className="col-md-6">
            <AddAuthor />
          </div>
          <div className="col-md-6">
            <AddBook />
          </div>
        </div>
        <div className="mt-4">
          <BookList />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
