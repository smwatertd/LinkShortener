import { observer } from "mobx-react-lite";

import { SocketForm } from "../components/forms/SocketForm";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const Main = observer(() => {
  return (
    <div>
      <Header />
      <SocketForm />
      <Footer />
    </div>
  );
});

export { Main };
