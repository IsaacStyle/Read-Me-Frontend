import React from "react";
import "./post.css";
import { useState, useEffect } from "react";
import { getComments, getComment } from "../../services/comments";
import { getPost } from "../../services/posts";

export default function Post({post, setModalPost, setDisplayModal}) {

  const [commentCount, setCommentCount] = useState(0)
  const [upvote, setUpvote] = useState(0)
  const [downvote, setDownvote] = useState(0)
  const [totalvote, setTotalvote] = useState(0)
  
  async function commentMetrics(){
      let res = await getComments()
      setCommentCount(res.length)
      // setDownvote(res.down_votes)
      // setUpvote(res.up_votes)
      // console.log(res.id)
    }

    async function postMetrics(){
      let res = await getPost(3)
      let ups = res.up_votes
      let downs = res.down_votes
      let totes = (ups - downs)
      setUpvote(ups)
      setDownvote(downs)
      setTotalvote(totes)
    }
  postMetrics()
  commentMetrics()

  function handleClick() {
    console.log("Modal was clicked")
    setModalPost(post)
    setDisplayModal(true)
    document.body.classList.add("no-scroll")
  }

  return (
    <div onClick={handleClick} className="post-card">
      <h2>Title of the Post: </h2>
      <img
        src="https://www.explore.com/img/gallery/the-most-beautiful-coral-reefs-in-the-world/great-barrier-reef-australia-1667589677.jpg"
        alt="123">
      </img>
      <div id = 'votes-div'>
        <span className="votes" id = 'upVotes'> ⬆: {upvote} </span>
        <br />
        <span className ='votes'id = 'totalVotes'>{totalvote}</span>
        <br />
        <span className="votes" id ='downVotes'> ⬇: {downvote} </span>
        <p id = 'comments-tab'> 💬 {commentCount} Comments </p>
      </div>
      
      {/* <p> Fish are great and cool as well. They are fun.</p> */}
    </div>
  );
}
