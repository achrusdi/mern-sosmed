import { FlexBetween, WidgetWrapper } from "components";
import { Shimmer, SkeletonElement } from ".";
import { Box } from "@mui/material";

const SkeletonPost = () => {
    return (
        <WidgetWrapper m='2rem 0' className="skeleton-wrapper">
            {/* Friend */}
            <FlexBetween>
                <FlexBetween gap="1rem">
                    {/* UserImage */}
                    <Box>
                        <SkeletonElement type='image-profile' />
                    </Box>
                    <Box
                        width='75px'
                    >
                        <SkeletonElement type='name' style={{ marginBottom: '4px' }} />
                        <SkeletonElement type='location' />
                    </Box>
                </FlexBetween>
                <SkeletonElement type='icon' />
            </FlexBetween>

            <SkeletonElement type='text' style={{ marginTop: '1rem' }} />
            <SkeletonElement type='text' style={{ marginTop: '5px' }} />
            <SkeletonElement type='text' style={{ marginTop: '5px', marginBottom: '12px' }} />

            <SkeletonElement type='image' />

            <FlexBetween mt='0.5rem'>
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <SkeletonElement type='icon' />
                        <Box
                            width='20px'
                        >
                            <SkeletonElement type='icon-text' />
                        </Box>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <SkeletonElement type='icon' />
                        <Box
                            width='20px'
                        >
                            <SkeletonElement type='icon-text' />
                        </Box>
                    </FlexBetween>
                </FlexBetween>

                <SkeletonElement type='icon' />
            </FlexBetween>
            <Shimmer />
        </WidgetWrapper>
    );
}

export default SkeletonPost;