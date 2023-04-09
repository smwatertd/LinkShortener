import { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const Footer = observer(() => {
    const { redirect } = useContext(Context);

    if (redirect.isRedirect) {
        return;
    }

    return (
        <div>
            Footer
        </div>
    );
});

export { Footer };
