import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { SIGNUP_MUTATION } from "../graphql/mutations";
import { useRouter } from "next/router";
import checkAuth from "../hocs/checkAuth";
import { Form, InputType } from "../components/Form";
import { useAuthReducer } from "../hooks/useAuthReducer";

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const [signup] = useMutation(SIGNUP_MUTATION);
  const router = useRouter();
  const { state, dispatch } = useAuthReducer({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    error: null,
  });
  const { username, email, password, passwordConfirm, error } = state;

  const handleField = (payload: string, field: string) => {
    dispatch({ type: "FIELD", field, payload });
    return;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      dispatch({
        type: "ERROR",
        error: { field: "username", message: "Please fill in all fields" },
      });
      return;
    }
    if (password !== passwordConfirm) {
      dispatch({
        type: "ERROR",
        error: { field: "password", message: "Passwords do not match" },
      });
      return;
    }

    const response = await signup({
      variables: {
        options: {
          username: username,
          email: email,
          password: password,
        },
      },
    });
    if (response.data.signup?.error) {
      dispatch({ type: "ERROR", error: response.data.signup.error });
      return;
    }
    router.push("/login");
    return;
  };

  const inputs: InputType[] = [
    {
      value: username!,
      field: "username",
    },
    {
      value: email!,
      field: "email",
    },
    {
      value: password,
      field: "password",
      type: "password",
    },
    {
      value: passwordConfirm!,
      field: "passwordConfirm",
      title: "Confirm Password",
      type: "password",
    },
  ];

  return (
    <Form
      handleSubmit={handleSubmit}
      title={"Sign up"}
      inputs={inputs}
      error={error}
      handleChange={handleField}
    >
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
      <Link href="/login">
        <div className="text-xs mb-2 underline cursor-pointer text-center">
          Already have an account?
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

export default checkAuth(Signup);
