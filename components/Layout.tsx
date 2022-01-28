import { Navbar } from "./Navbar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl m-auto font-body">{children}</main>
    </>
  );
};
