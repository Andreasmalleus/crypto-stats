import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      user {
        id
        email
        username
      }
      error {
        field
        message
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($options: SignupInput!) {
    signup(options: $options) {
      error {
        field
        message
      }
      user {
        id
        email
        username
      }
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($options: UserUpdateInput!) {
    updateUsernameOrEmail(options: $options) {
      user {
        id
        username
        email
      }
      error {
        field
        message
      }
    }
  }
`;

export const FAVORITE_MUTATION = gql`
  mutation Favorite($cryptoId: Int!, $category: String!) {
    favorite(cryptoId: $cryptoId, category: $category) {
      cryptoId
      userId
      category
    }
  }
`;

export const UNFAVORITE_MUTATION = gql`
  mutation UnFavorite($cryptoId: Int!, $category: String!) {
    unfavorite(cryptoId: $cryptoId, category: $category)
  }
`;
