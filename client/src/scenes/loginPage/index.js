import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { useTemplatesContext } from "scenes/templates";

const LoginPage = ({ }) => {
    const theme = useTheme();
    // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { isNonMobileScreens } = useTemplatesContext();
    // console.log('====================================');
    // console.log(isNonMobileScreens);
    // console.log('====================================');

    return (
        <Box>
            <Box
                width='100%'
                backgroundColor={theme.palette.background.alt}
                p='1rem 6%'
                textAlign="center"
            >
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                >
                    NdogPedia
                </Typography>
            </Box>
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p='2rem'
                m='2rem auto'
                borderRadius='1.5rem'
                backgroundColor={theme.palette.background.alt}
            >
                <Typography
                    fontWeight='500'
                    variant="h5"
                    sx={{ mb: '1.5rem' }}
                >
                    Welcome to the new version of Ndogpedia! Please login with your Google account below and start exploring our database.
                </Typography>
                <Form />
            </Box>
        </Box>
    );
}

export default LoginPage;