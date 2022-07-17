import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { LOGIN_MUTATION } from "../graphql/mutations";
import { FieldError } from "../types";
import { FormInput } from "../components/Form/FormInput";
import { useRouter } from "next/router";
import { ME_QUERY } from "../graphql/queries";
import checkAuth from "../hocs/checkAuth";
import { Form } from "../components/Form";

interface LoginProps {}

interface LoginData {
  id: number;
  username: string;
  email: string;
}

const Login: React.FC<LoginProps> = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN_MUTATION);
  const [error, setError] = useState<FieldError>(null);
  const router = useRouter();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameOrEmail === "" || password === "") {
      setError({
        field: "usernameOrEmail",
        message: "Please fill in all fields",
      });
      return;
    }
    const response = await login({
      variables: { usernameOrEmail: usernameOrEmail, password: password },
    });
    if (response.data.login?.error) {
      setError(response.data.login.error);
      return;
    }
    const { id, username, email } = response.data.login.user;
    updateCache({ id, username, email });
    router.push("/");
    return;
  };

  const inputs = [
    {
      value: usernameOrEmail,
      field: "usernameOrEmail",
      setter: setUsernameOrEmail,
      title: "Username/Email",
    },
    {
      value: password,
      field: "password",
      setter: setPassword,
      title: "Password",
      type: "password",
    },
  ];

  return (
    <Form
      handleSubmit={handleSubmit}
      title={"Log in"}
      inputs={inputs}
      error={error}
    >
      <div className="text-xs mb-2 underline cursor-pointer">
        Forgot password?
      </div>
      <button className="btn-primary mt-3 mb-5 shadow-md">Log in</button>
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
