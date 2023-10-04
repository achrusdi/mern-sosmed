import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTemplatesContext } from "scenes/templates";
import { FriendListWidget, MyPostWidget, PostsWidget, UserWidget } from "scenes/widgets";

const ProfilePage = () => {
    const [user, userSet] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const { isNonMobileScreens, serverUrl } = useTemplatesContext();

    const getUser = async () => {
        const response = await fetch(`${serverUrl}/users/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data);
        userSet(data);
    }

    useEffect(() => {
        getUser();
    }, []);

    console.log(userId);
    if (!user) return null;
    console.log(2);

    return (
        <Box>
            <Box
                width='100%'
                padding='2rem 6%'
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap='2rem'
                justifyContent='center'
            >
                <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m='2rem 0' />
                    <FriendListWidget userId={userId} />
                </Box>

                <Box
                    flexBasis={isNonMobileScreens ? '42%' : undefined}
                    mt={isNonMobileScreens ? undefined : '2rem'}
                >
                    <MyPostWidget picturePath={user.picturePath} />
                    <PostsWidget userId={user._id} isProfile />
                </Box>
            </Box>
        </Box>
    );
}

export default ProfilePage;