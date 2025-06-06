import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "../axios/axios";
import { Post } from "../components/Post";
import ReactMarkdown  from "react-markdown";


export const FullPost = () => {

  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const {id} = useParams()
  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.warn(err)
        alert('Ошибка получения статьи')
      })
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags ={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
     
    </>
  );
};
