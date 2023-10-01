import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { FlexBetween, Friend, WidgetWrapper } from "components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTemplatesContext } from "scenes/templates";
import { setPost } from "state";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, isCommentsSet] = useState(false);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { serverUrl, palette } = useTemplatesContext();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`${serverUrl}/posts/${postId}/like`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        const updatePost = await response.json();
        dispatch(setPost({ post: updatePost }));
    }

    return (
        <WidgetWrapper m='2rem 0'>
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{
                mt: '1rem'
            }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width='100%'
                    height='auto'
                    alt='post'
                    style={{
                        borderRadius: '0.75rem',
                        marginTop: '0.75rem'
                    }}
                    src={`${serverUrl}/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt='0.25rem'>
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => isCommentsSet(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt='0.5rem'>
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </WidgetWrapper>
    );
}

export default PostWidget;