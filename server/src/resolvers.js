import pubsub from './pubsub';
import { withFilter } from 'apollo-server';

const books = [
  {
    id: 1,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    id: 2,
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

export const resolvers = {
  Query: {
    //explain the parameters
    books: (_, { input }, context, info) => {
      return books;
    },
    book: (_, { id }) => {
      return books.find(book => book.id === id);
    },
    authors: () => {
      return [
        { name: 'Todd', twitter: 'toddmotto' },
        { name: 'React', twitter: 'reactjs' }
      ];
    }
  },

  // Book: {
  //   title: async (book) => {
  //     //simulate a big delay in processing
  //     await new Promise(resolve => setTimeout(resolve, 400))
  //     return book.title + 'test'
  //   }
  // },

  Mutation: {
    addAuthor: (_, { input: { name, twitter } }) => {
      return {
        name,
        twitter
      };
    },
    deleteBook: (_, { title }) => true,
    changeBookTitle: async (_, { input }) => {
      let { id, title } = input;

      //simulate a big delay in processing
      //await new Promise(resolve => setTimeout(resolve, 3000))

      let book = books.find(book => book.id === id);

      pubsub.publish('bookTitleChanged', {
        bookTitleChanged: { ...book, title }
      });

      pubsub.publish('followAuthor', {
        bookTitleChanged: { ...book }
      });

      //Return the new book title
      return {
        ...book,
        title: title
      };
    }
  },

  Subscription: {
    bookTitleChanged: {
      subscribe: () => pubsub.asyncIterator(['bookTitleChanged'])
    },
    followAuthor: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['followAuthor']),
        (payload, variables) => {
          console.log('payload', payload, 'variables', variables);
          return payload.bookTitleChanged.author === variables.authorName;
        }
      ),
      resolve: payload => payload.bookTitleChanged
    }
  }
};
