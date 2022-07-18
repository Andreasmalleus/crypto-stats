import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { FieldError } from "../types";
import { FormInput } from "../components/Form/Input";
import { useRouter } from "next/router";
import { ME_QUERY } from "../graphql/queries";
import checkAuth from "../hocs/checkAuth";
import { Form } from "../components/Form";
import { useAuthReducer } from "../hooks/useAuthReducer";

interface LoginProps {}

interface LoginData {
  id: number;
  username: string;
  email: string;
}

const Login: React.FC<LoginProps> = () => {
  const { state, dispatch } = useAuthReducer({
    usernameOrEmail: "",
    password: "",
    error: null,
  });
  const [login] = useMutation(LOGIN_MUTATION);
  const router = useRouter();

  const { usernameOrEmail, password, error } = state;

  const apollo = useApolloClient();

  const updateCache = ({ id, username, email }: LoginData) => {
    apollo.cache.writeQuery({
      query: ME_QUERY,
      data: {
        me: {
          __typename: "User",
          id: id,
          username: username,
          email: email,
        },
      },
    });
  };

  const handleField = (payload: string, field: string) => {
    dispatch({ type: "FIELD", field, payload });
    return;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameOrEmail === "" || password === "") {
      dispatch({
        type: "ERROR",
        error: {
          field: "usernameOrEmail",
          message: "Please fill in all fields",
        },
      });
      return;
    }
    const response = await login({
      variables: { usernameOrEmail: usernameOrEmail, password: password },
    });
    if (response.data.login?.error) {
      dispatch({
        type: "ERROR",
        error: response.data.login.error,
      });
      return;
    }
    const { id, username, email } = response.data.login.user;
    updateCache({ id, username, email });
    router.push("/");
    return;
  };

  const inputs = [
    {
      value: usernameOrEmail!,
      field: "usernameOrEmail",
      title: "Username/Email",
    },
    {
      value: password,
      field: "password",
      type: "password",
    },
  ];

  return (
    <Form
      handleSubmit={handleSubmit}
      title={"Log in"}
      inputs={inputs}
      error={error}
      handleChange={handleField}
    >
      <div className="text-xs mb-2 underline cursor-pointer">
        Forgot password?
      </div>
      <div className="flex items-center mb-4">
        <div className="w-1/2 h-1 bg-slate-100 mr-2 rounded"></div>
        <div className="text-slate-200 text-xs">OR</div>
        <div className="w-1/2 h-1 bg-slate-100 ml-2 rounded"></div>
      </div>
      <div className="flex items-center justify-evenly mb-4">
        <div className="cursor-pointer">
          <Image src="/icons/facebook.svg" width={30} height={30} />
        </div>
        <div className="cursor-pointer">
          <Image src="/icons/github.svg" width={30} height={30} />
        </div>
        <div className="cursor-pointer ">
          <Image src="/icons/google.svg" width={30} height={30} />
        </div>
      </div>
      <Link href="/signup">
        <div className="text-xs mb-2 underline cursor-pointer text-center">
          Don't have an account?
        </div>
      </Link>
      <Link href="/">
        <div className="text-xs mb-2 underline cursor-pointer text-center">
          Back to home..
        </div>
      </Link>
    </Form>
  );
};

export default checkAuth(Login);
