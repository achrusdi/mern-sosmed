import { Box, Divider } from "@mui/material";
import { FlexBetween, WidgetWrapper } from "components";
import { SkeletonElement } from ".";

const SkeletonUserWidget = () => {
    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap='0.5rem'
                pb='1.1rem'
            >
                <FlexBetween gap='1rem'>
                    {/* <UserImage image={picturePath} /> */}
                    <Box>
                        <SkeletonElement type='image-profile' />
                    </Box>
                    <Box>
                        <Box
                            width='94px'
                        >
                            <SkeletonElement type='name' style={{ marginBottom: '4px' }} />
                            <SkeletonElement type='location' />
                        </Box>
                    </Box>
                </FlexBetween>
                <SkeletonElement type='icon' />
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box p='1rem 0'>
                <Box
                    display='flex'
                    alignItems='center'
                    gap='1rem'
                    mb='0.5rem'
                >
                    <SkeletonElement type='m-icon' />
                    <Box width='100px'>
                        <SkeletonElement type='icon-text' />
                    </Box>
                </Box>
                <Box
                    display='flex'
                    alignItems='center'
                    gap='1rem'
                >
                    <SkeletonElement type='m-icon' />
                    <Box width='100px'>
                        <SkeletonElement type='icon-text' />
                    </Box>
                </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}
            <Box p='1rem 0'>
                <FlexBetween mb='0.5rem'>
                    <Box width='60%'>
                        <SkeletonElement type='text' />
                    </Box>
                    <Box width='20%'>
                        <SkeletonElement type='text' />
                    </Box>
                </FlexBetween>

                <FlexBetween>
                    <Box width='60%'>
                        <SkeletonElement type='text' />
                    </Box>
                    <Box width='20%'>
                        <SkeletonElement type='text' />
                    </Box>
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}
            <Box p='1rem 0'>
                <Box width='50%' mb='1rem'>
                    <SkeletonElement type='title' />
                </Box>
                <FlexBetween
                    gap='1rem'
                    mb='0.5rem'
                >
                    <FlexBetween gap='1rem'>
                        <SkeletonElement type='m-icon' />
                        <Box>
                            <Box width='50px' mb='0.25rem'>
                                <SkeletonElement type='icon-text' />
                            </Box>
                            <Box width='100px'>
                                <SkeletonElement type='icon-text' />
                            </Box>
                        </Box>
                    </FlexBetween>
                    <SkeletonElement type='s-icon' />
                </FlexBetween>

                <FlexBetween
                    gap='1rem'
                >
                    <FlexBetween gap='1rem'>
                        <SkeletonElement type='m-icon' />
                        <Box>
                            <Box width='50px' mb='0.25rem'>
                                <SkeletonElement type='icon-text' />
                            </Box>
                            <Box width='100px'>
                                <SkeletonElement type='icon-text' />
                            </Box>
                        </Box>
                    </FlexBetween>
                    <SkeletonElement type='s-icon' />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
}

export default SkeletonUserWidget;