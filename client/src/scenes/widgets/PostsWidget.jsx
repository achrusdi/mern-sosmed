import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from './PostWidget';
import { useTemplatesContext } from "scenes/templates";
import { Box, CircularProgress } from "@mui/material";
import { SkeletonPost } from "./skeletons";

const PostsWidget = ({ userId, isProfile = false }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const { serverUrl } = useTemplatesContext();
    const dispatch = useDispatch();
    const posts = useSelector((state) => currentPage === 1 ? null : state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        if (isLoading) return;
        setIsLoading(true);

        const response = await fetch(`${serverUrl}/posts?page=${currentPage}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });

        if (await response.status === 200) {
            const data = await response.json();
            dispatch(setPosts({ posts: data, isInitial: currentPage === 1 ? true : false }));
            setCurrentPage(currentPage + 1);
        } else {
            console.log('something wrong!');
        }
        setIsLoading(false);
    }

    const getUserPosts = async () => {
        if (isLoading) return;
        setIsLoading(true);

        const response = await fetch(`${serverUrl}/posts/${userId}/posts`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        if (await response.status === 200) {
            const data = await response.json();
            dispatch(setPosts({ posts: data, isInitial: currentPage === 1 ? true : false }));
            setCurrentPage(currentPage + 1);
        } else {
            console.log('something wrong!');
        }

        setIsLoading(false);
    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            const scrollableElement = document.documentElement;
            if (scrollableElement.scrollHeight - scrollableElement.scrollTop === scrollableElement.clientHeight) {
                if (isProfile) {
                    getUserPosts();
                } else {
                    getPosts();
                }
            }
        };

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, [currentPage, isLoading]);


    return (
        <>
            {posts === null
                ?
                [1, 2, 3, 4, 5].map((n) => (
                    <SkeletonPost key={n} />
                ))
                : posts.map(
                    ({
                        _id,
                        userId,
                        firstName,
                        lastName,
                        description,
                        location,
                        picturePath,
                        userPicturePath,
                        likes,
                        comments
                    }) => (
                        <PostWidget
                            key={_id}
                            postId={_id}
                            postUserId={userId}
                            name={`${firstName} ${lastName}`}
                            description={description}
                            location={location}
                            picturePath={picturePath}
                            userPicturePath={userPicturePath}
                            likes={likes}
                            comments={comments}
                        />
                    )
                )}
            {isLoading && (
                <Box textAlign='center'>
                    <CircularProgress />
                </Box>
            )}
        </>
    );
}

export default PostsWidget;