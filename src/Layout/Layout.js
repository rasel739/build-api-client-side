import Routed from "../routes/Routed";
import Footer from "../sheared/footer/Footer";
import Navbar from "../sheared/navbar/Navbar";

const Layout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Routed />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
