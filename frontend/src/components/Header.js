import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";

const Header = observer(() => {
    const { redirect } = useContext(Context);

    if (redirect.isRedirect) {
        return ;
    }

    return (
        <div>
            Header
        </div>
    );
});

export { Header };
