import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from './PostWidget';
import { useTemplatesContext } from "scenes/templates";

const PostsWidget = ({ userId, isProfile = false }) => {
    const { serverUrl, palette } = useTemplatesContext();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch(`${serverUrl}/posts`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        if (await response.status === 200) {
            const data = await response.json();
            dispatch(setPosts({ posts: data }));
        } else {
            console.log('something wrong!');
        }
    }

    const getUserPosts = async () => {
        const response = await fetch(`${serverUrl}/posts/${userId}/posts`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        if (await response.status === 200) {
            const data = await response.json();
            dispatch(setPosts({ posts: data }));
        } else {
            console.log('something wrong!');
        }

    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, [])

    return (
        <>
            {posts.map(
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
            ).reverse()}
        </>
    );
}

export default PostsWidget;