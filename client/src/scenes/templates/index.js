import Navbar from "scenes/navbar";

const { useMediaQuery, useTheme } = require("@mui/material");
const { createContext, useState, useContext } = require("react");

const MyContext = createContext();

export const Template = (props) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { palette } = useTheme();
    // console.log('====================================');
    // console.log(props.isAuth);
    // console.log('====================================');

    return (
        <MyContext.Provider value={{ isNonMobileScreens, serverUrl, palette }}>
            {props.isAuth && (
                <Navbar />
            )}
            {props.children}
        </MyContext.Provider>
    );
}

export const useTemplatesContext = () => {
    return useContext(MyContext);
}