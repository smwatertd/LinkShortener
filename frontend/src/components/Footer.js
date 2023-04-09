import { useContext } from "react";

import { observer } from "mobx-react-lite";

import { Context } from "../index";

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
