import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5 rem 1.5 rem 0.75 rem 1.5 rem",
  backgroundColor: theme.palette.backgound.alt,
  borderRadius: "0.75 rem",
}));

export default WidgetWrapper;
