import { useState } from "react";

import { login, logOut } from "../http/UserApi";

const Auth = () => {
    const buttonClicked = () => {
        login(username, password);
    };

    const logOutButton = () => {
        logOut();
    };

    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("599523956qQ");


    return (
        <div>
            <p>username</p>
            <input type="text" onChange={e => setUsername(e.target.value)}/>
            <p>email</p>
            {/* <input type="text" onChange={e => setEmail(e.target.value)}/>
            <p>password</p> */}
            <input type="password" onChange={e => setPassword(e.target.value)}/>
            <br/>
            <button onClick={buttonClicked}>Login</button>
            <button onClick={logOutButton}>get</button>
        </div>
    );
};

export { Auth };
