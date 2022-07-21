import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      username
    }
  }
`;

export const FAVORITES_QUERY = gql`
  query Favorites($category: String!) {
    favorites(category: $category) {
      id
      cryptoId
      category
      userId
    }
  }
`;
