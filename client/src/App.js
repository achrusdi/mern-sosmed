import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from 'react';
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { themeSettings } from "theme";
import { Template } from "scenes/templates";
import Navbar from "scenes/navbar";


function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token));
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Template isAuth={isAuth}>
                        <CssBaseline />
                        {/* <Navbar /> */}
                        <Routes>
                            <Route path="/" element={<LoginPage isNonMobileScreens={isNonMobileScreens} />} />
                            <Route path="/home" element={isAuth ? <HomePage isNonMobileScreens={isNonMobileScreens} /> : <Navigate to='/' />} />
                            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to='/' />} />
                        </Routes>
                    </Template>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
