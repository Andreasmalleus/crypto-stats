import { Navbar } from "./Navbar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "1300px", width: "100%", margin: "auto" }}>
        {children}
      </main>
    </>
  );
};
