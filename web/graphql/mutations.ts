import {gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
	mutation Login($usernameOrEmail: String!, $password: String!){
		login(usernameOrEmail: $usernameOrEmail, password: $password){
			user{
				id,
				email,
				username,
			}
			error{
				field,
				message,
			}
		}
	}
`

export const SIGNUP_MUTATION = gql`
	mutation Signup($options: SignupInput!){
		signup(options: $options) {
			error{
				field,
				message
			}
			user {
				id,
				email,
				username
			}
		}
	}
`