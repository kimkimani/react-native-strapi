import React from "react";

export default React.createContext({
    userLoggedIn:{},
    setUserLoggedIn: (user) => {},
    userLogOut: () => {}
});