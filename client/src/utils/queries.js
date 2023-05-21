import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
        }
    },
`;

export const GET_BOOKS = gql`
    query getBooks {
        books {
            _id
            authors
            description
            title
            image
            link
        }
    }
`;
