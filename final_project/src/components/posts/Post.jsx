import React from "react";
import "./post.css";
import { useState, useEffect } from "react";
import { getComments, getComment } from "../../services/comments.js";
import { getPost, getPosts } from "../../services/posts";

export default function Post({ key, displayModal, posts, post, setModalPost, setDisplayModal, modalPost, comments }) {
  const [vote,setVote]  = useState({id: post.id, up_votes: post.up_votes, down_votes: post.down_votes})

  useEffect(() => {
    if (modalPost.id == post.id) {
      setVote({id: modalPost.id, up_votes: modalPost.up_votes, down_votes: modalPost.down_votes})
    }
  }, [displayModal]);

  function handleClick() {
    console.log("Modal was clicked");
    setModalPost(post);
    setDisplayModal(true);
    document.body.classList.add("no-scroll");
  }

  return (
    <div key = {key} onClick={handleClick} className="post-card">
      <h2 id="title">{post.title} </h2>
      <img src={`${post.img_url}`} alt={`${post.id}`} />
      <div id="votes-div">
        <span className="votes" id="upVotes">
          {" "}
          ⬆:{vote.up_votes}{" "}
        </span>
        <br />
        <span className="votes" id="downVotes">
          {" "}
          ⬇: {vote.down_votes}{" "}
        </span>
        <p id="comments-tab"> {comments.filter(comment => comment.post === post.id).length}  people are talking about this 💬 </p>
      </div>
    </div>
  );
}
