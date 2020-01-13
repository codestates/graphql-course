import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

export const subscription = gql`
  subscription FollowAuthor($authorName: String!) {
    followAuthor(authorName: $authorName) {
      id
      title
      author
    }
  }
`;

// export default () => useSubscription(subscription);
export default () => {
  let subscribe = useSubscription(subscription);

  return author => {
    subscribe({
      variables: { author },
      optimisticResponse: {
        changeBookTitle: {
          __typename: 'Book'
        }
      }
    });
  };
};
