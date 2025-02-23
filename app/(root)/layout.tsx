import Navbar from "@/app/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      {children}
    </main>
  );
};

export default Layout;
