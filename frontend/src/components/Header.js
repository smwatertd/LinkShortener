import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../index";

const Header = observer(() => {
  const { redirect } = useContext(Context);

  if (redirect.isRedirect === true) {
    return (
      <></>
    );
  }

  return (
    <div>
      Header
    </div>
  );
});

export { Header };
