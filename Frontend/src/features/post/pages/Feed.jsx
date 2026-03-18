import React from "react";
import { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/post";
import {usePost} from "../hooks/usePost";
import Nav from "../../shared/components/Nav";


const Feed = () => {

  const {feed, handleGetFeed, loading} = usePost()

  useEffect(() => {
    handleGetFeed()
  }, [])

  if(loading || !feed) {
    return (<main><h1>Feed is Loading...</h1></main>)
  }


  console.log(feed)



  return (
    <main className="feed-page">
      <Nav />
      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return (
              <Post key={post._id} user={post.user} post={post} />
            );

            
          })}
        
        </div>
      </div>
    </main>
  );
};

export default Feed;
