import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { SIGNUP_MUTATION } from "../graphql/mutations";
import { FieldError } from "../types";
import { FormError } from "../components/FormError";
import { FormInput } from "../components/FormInput";
interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [signup] = useMutation(SIGNUP_MUTATION);
  const [error, setError] = useState<FieldError>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      setError({ field: "username", message: "Please fill in all fields" });
      return;
    }
    if (password !== passwordConfirm) {
      setError({ field: "password", message: "Passwords do not match" });
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
    setError(response.data.signup.error);
    return;
  };

  return (
    <form
      className="flex justify-center items-center h-full"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="w-1/6">
        <h1 className="font-headings text-2xl text-center mb-6">Sign up</h1>
        <div className="mb-1 text-sm">Username</div>
        <FormInput
          value={username}
          field="username"
          setValue={setUsername}
          error={error}
        />
        <div className="mb-1 text-sm">Email</div>
        <FormInput
          value={email}
          field="email"
          setValue={setEmail}
          error={error}
        />
        <div className="mb-1 text-sm">Password</div>
        <FormInput
          value={password}
          field="password"
          setValue={setPassword}
          error={error}
          type="password"
        />
        <div className="mb-1 text-sm">Confirm Password</div>
        <FormInput
          value={passwordConfirm}
          field="passwordConfirm"
          setValue={setPasswordConfirm}
          error={error}
          type="password"
        />
        <button className="btn-primary mt-3 mb-5 shadow-md">Sign up</button>
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
      </div>
    </form>
  );
};

export default Signup;
