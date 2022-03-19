import Image from "next/image";
import Link from "next/link";

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
  return (
    <div
      className="absolute hidden z-50 m-auto pt-4"
      style={{ display: isShown ? "block" : "none" }}
      onMouseLeave={() => setIsShown(false)}
    >
      <div className="shadow-md bg-white rounded-md py-6 px-8">
        <div className="flex border-b border-slate-200 pb-4 items-center cursor-pointer">
          <Image src="/icons/user.svg" width={40} height={40} />
          <div className="flex-col ml-2">
            <div className="text-xs">{username}</div>
            <div className="text-xs text-slate-400">View my profile</div>
          </div>
        </div>
        <Link href="/watchlist">
          <div className="text-xs p-2 mt-4 hover:bg-slate-100 rounded-md cursor-pointer">
            Watchlist
          </div>
        </Link>
        <Link href="/account">
          <div className="text-xs p-2 my-4 hover:bg-slate-100 rounded-md cursor-pointer">
            Account Settings
          </div>
        </Link>
        <div className="text-xs p-2 hover:bg-slate-100 rounded-md cursor-pointer">
          Log out
        </div>
      </div>
    </div>
  );
};
