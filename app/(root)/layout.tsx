import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
