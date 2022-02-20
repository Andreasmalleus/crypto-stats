import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ username, email, password, passwordConfirm });
  };
  return (
    <form
      className="flex justify-center items-center h-full"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="w-1/6">
        <h1 className="font-headings text-2xl text-center mb-6">Sign up</h1>
        <div className="mb-1 text-sm">Username</div>
        <input
          type="text"
          className="border border-slate-200 rounded-md text-xs p-1 w-full mb-2 shadow-sm"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <div className="mb-1 text-sm">Email</div>
        <input
          type="text"
          className="border border-slate-200 rounded-md text-xs p-1 w-full mb-2 shadow-sm"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="mb-1 text-sm">Password</div>
        <input
          type="password"
          className="border border-slate-200 rounded-md text-xs p-1 w-full mb-2 shadow-sm"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="mb-1 text-sm">Confirm Password</div>
        <input
          type="password"
          className="border border-slate-200 rounded-md text-xs p-1 w-full mb-2 shadow-sm"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
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
