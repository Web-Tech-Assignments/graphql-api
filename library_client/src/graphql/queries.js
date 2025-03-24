import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      authorId
      name
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      bookId
      title
      author {
        authorId
        name
      }
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation AddAuthor($authorId: String!, $name: String!) {
    addAuthor(authorId: $authorId, name: $name) {
      authorId
      name
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($authorId: String!) {
    deleteAuthor(authorId: $authorId)
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($authorId: String!, $name: String!) {
    updateAuthor(authorId: $authorId, name: $name) {
      authorId
      name
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($bookId: String!, $title: String!, $authorId: String!) {
    addBook(bookId: $bookId, title: $title, authorId: $authorId) {
      bookId
      title
      author {
        authorId
        name
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($bookId: String!) {
    deleteBook(bookId: $bookId)
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($bookId: String!, $title: String!) {
    updateBook(bookId: $bookId, title: $title) {
      bookId
      title
    }
  }
`;
