import { Box, Typography } from "@mui/material";
import { Friend, WidgetWrapper } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTemplatesContext } from "scenes/templates";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { serverUrl, palette } = useTemplatesContext();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const getFriends = async () => {
        const response = await fetch(`${serverUrl}/users/${userId}/friends`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        });

        if (await response.status === 200) {
            const data = await response.json();
            dispatch(setFriends({ friends: data }));
        } else {
            console.log('something wrong!');
        }

    }

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight='500'
                sx={{
                    mb: '1.5rem'
                }}
            >
                Friend List
            </Typography>
            <Box display='flex' flexDirection='column' gap='1.5rem'>
                {friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
}

export default FriendListWidget;