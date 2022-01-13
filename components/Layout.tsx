import { NavBar } from "./NavBar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};
