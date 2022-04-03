import { Navbar } from "./Navbar";

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col items-center h-screen">
      <Navbar />
      <main className="w-full h-full max-w-screen-xl font-body">
        {children}
      </main>
    </div>
  );
};
