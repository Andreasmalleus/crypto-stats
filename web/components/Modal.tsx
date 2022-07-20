import { useMutation, useApolloClient } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { LOGOUT_MUTATION } from "../graphql/mutations";

interface ModalProps {
  username: string;
  isShown: boolean;
  setIsShown: (value: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
  username,
  isShown,
  setIsShown,
}) => {
  const [logOut] = useMutation(LOGOUT_MUTATION);
  const apollo = useApolloClient();
  const handleLogOut = async () => {
    const response = await logOut();
    if (!response.data) {
      console.log("something went wrong");
      return;
    }
    apollo.cache.reset();
    return;
  };

  return (
    <div
      className="absolute hidden z-50 m-auto pt-4"
      style={{ display: isShown ? "block" : "none" }}
      onMouseLeave={() => setIsShown(false)}
    >
      <div className="shadow-md bg-white rounded-md">
        <div className="flex border-b border-slate-200 items-center py-4 px-6 hover:bg-slate-100 cursor-pointer">
          <Image src="/icons/user.svg" width={40} height={40} />
          <div className="flex-col ml-2">
            <div className="text-xs">{username}</div>
            <div className="text-xs text-slate-400">View my profile</div>
          </div>
        </div>
        <nav className="flex flex-col p-2">
          <Link href="/watchlist">
            <a className="text-xs hover:bg-slate-100 rounded-md cursor-pointer px-4 py-2">
              Watchlist
            </a>
          </Link>
          <Link href="/account">
            <a className="text-xs hover:bg-slate-100 rounded-md cursor-pointer px-4 py-2">
              Account Settings
            </a>
          </Link>
          <a
            onClick={() => handleLogOut()}
            className="text-xs hover:bg-slate-100 rounded-md cursor-pointer px-4 py-2"
          >
            Log out
          </a>
        </nav>
      </div>
    </div>
  );
};
