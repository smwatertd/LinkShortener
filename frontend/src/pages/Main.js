import { SocketForm } from "../components/forms/SocketForm";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const Main = () => {
  // Главная страница
  return (
    <div>
      <Header />
      <SocketForm />
      <Footer />
    </div>
  );
};

export { Main };
