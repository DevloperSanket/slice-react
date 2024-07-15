import { createContext } from "react";

const mainContext = createContext({
    user: {
        appToken: null,
        apiLoad: false
    }
});

export default mainContext;