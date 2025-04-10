import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../components/Post';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.data)
  const { posts } = useSelector((state) => state.posts)
  
  const isPostsLoading = posts.status === 'loading'

  useEffect(() =>{
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [dispatch])


  return (
    <>
      <Grid container spacing={4} display="flex" justifyContent="center" alignItems="center">
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={`http://localhost:4444${obj.imageUrl}`}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          ))}
        </Grid>
      </Grid>
    </>
  );
};
