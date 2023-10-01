import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MoreHorizOutlined,
    MicOutlined
} from '@mui/icons-material';
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from '@mui/material';
import { FlexBetween, UserImage, WidgetWrapper } from 'components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';
import { useTemplatesContext } from 'scenes/templates';
import Dropzone from 'react-dropzone';

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, isImageSet] = useState(false);
    const [image, imageSet] = useState(null);
    const [post, postSet] = useState('');
    const { serverUrl, palette } = useTemplatesContext();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const { isNonMobileScreens } = useTemplatesContext();
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append('userId', _id);
        formData.append('description', post);
        if (image) {
            formData.append('picture', image);
            formData.append('picturePath', image.name);
        }

        const response = await fetch(`${serverUrl}/posts`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        const posts = await response.json();
        dispatch(setPost({ posts }));
        imageSet(null);
        postSet('');
    }

    console.log(serverUrl);

    return (
        <WidgetWrapper>
            <FlexBetween gap='1.5rem'>
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What's on your mind now.."
                    onChange={(e) => postSet(e.target.value)}
                    value={post}
                    sx={{
                        width: '100%',
                        backgroundColor: palette.neutral.light,
                        borderRadius: '2rem',
                        padding: '1rem 2rem'
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius='5px'
                    mt='1rem'
                    p='1rem'>
                    <Dropzone
                        acceptedFiles='.jpg,.jpeg,.png'
                        multiple={false}
                        onDrop={
                            (acceptedFiles) => imageSet(acceptedFiles[0])
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p='1rem'
                                    width='100%'
                                    sx={{ '&:hover': { cursor: 'pointer' } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>
                                                {image.name}
                                            </Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => imageSet(null)}
                                        sx={{
                                            width: '15%'
                                        }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: '1.25rem 0' }} />

            <FlexBetween>
                <FlexBetween
                    gap='0.25rem'
                    onClick={() => isImageSet(!isImage)}
                >
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                                color: medium
                            }
                        }}
                    >
                        Image
                    </Typography>
                </FlexBetween>
                {isNonMobileScreens ? (
                    <>
                        <FlexBetween gap='0.25rem'>
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>
                        <FlexBetween gap='0.25rem'>
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>
                        <FlexBetween gap='0.25rem'>
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                ) : (
                    <FlexBetween gap='0.25rem'>
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: '3rem'
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
}

export default MyPostWidget;