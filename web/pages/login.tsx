import Image from "next/image";
import Link from "next/link";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-1/6">
        <h1 className="font-headings text-2xl text-center mb-6">Log in</h1>
        <div className="mb-1 text-sm">Username/Email</div>
        <input
          type="text"
          className="border border-slate-200 rounded-md text-xs p-1 w-full mb-2 shadow-sm"
        />
        <div className="mb-1 text-sm">Password</div>
        <input
          type="password"
          className="border border-slate-200 rounded-md text-xs p-1 w-full shadow-sm"
        />
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
      </div>
    </div>
  );
};

export default Login;