import { NavBar } from "./NavBar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <main style={{ maxWidth: "1300px", width: "100%", margin: "auto" }}>
        {children}
      </main>
    </>
  );
};
