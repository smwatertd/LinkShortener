import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../index";

const Footer = observer(() => {
  const { redirect } = useContext(Context);

  if (redirect.isRedirect === true) {
    return (
      <></>
    );
  }

  return (
    <div>
      Footer
    </div>
  );
});

export { Footer };
