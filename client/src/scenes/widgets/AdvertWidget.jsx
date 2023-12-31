import { Typography } from "@mui/material";
import { FlexBetween, WidgetWrapper } from "components";
import { useTemplatesContext } from "scenes/templates";

const AdvertWidget = () => {
    const { serverUrl, palette } = useTemplatesContext();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight='500'>
                    Sponsored
                </Typography>
                <Typography color={medium}>
                    Create Add
                </Typography>
            </FlexBetween>

            <img
                width='100%'
                height='auto'
                alt="advert"
                src={`${serverUrl}/assets/info4.jpeg`}
                style={{
                    borderRadius: '0.75rem',
                    margin: '0.75rem 0'
                }}
            />
            <FlexBetween>
                <Typography color={main}>MikaCosmetics</Typography>
                <Typography color={medium}>mikacosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m='0.5rem 0'>
                Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and shinning like light.
            </Typography>
        </WidgetWrapper>
    );
}

export default AdvertWidget;