import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { useTemplatesContext } from "scenes/templates";
import { UserWidget, MyPostWidget, PostsWidget, AdvertWidget, FriendListWidget } from "scenes/widgets";


const HomePage = () => {
    // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    const { isNonMobileScreens } = useTemplatesContext();

    return (
        <Box>
            {/* <Navbar isNonMobileScreens={isNonMobileScreens} /> */}
            <Box
                width='100%'
                padding='2rem 6%'
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap='0.5rem'
                justifyContent='space-between'
            >
                <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>

                <Box
                    flexBasis={isNonMobileScreens ? '42%' : undefined}
                    mt={isNonMobileScreens ? undefined : '2rem'}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis='26%'>
                        <AdvertWidget />
                        <Box m='2rem 0' />
                        <FriendListWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default HomePage;