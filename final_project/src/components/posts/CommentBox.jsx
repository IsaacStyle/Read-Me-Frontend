import { useState } from "react";
import "./CommentBox.css";
import { createComment } from "../../services/comments";
import {deletePost} from "../../services/posts.js"
import {  useParams, useNavigate } from "react-router-dom";

function CommentBox({ postId }) {
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (commentText.trim() === "") {
      return;
    }
    const newComment = {
      comment: commentText,
      post: postId,
      up_votes: 0,
      down_votes: 0,
      commenter: 1 // replace with the ID of the commenter if needed
    };
    try {
      const createdComment = await createComment(newComment);
      console.log("Comment created:", createdComment);
      setCommentText("");
      // add code to update the UI with the new comment if needed
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };


  let navigate = useNavigate();

  async function handleDelete() {
    console.log(postId)
    await deletePost(postId);
    window.location.reload()
    // navigate("/done", { replace: true });
  }


  return (
    <form className="comment-form" onSubmit={handleCommentSubmit}>
      <textarea
        className="comment-input"
        value={commentText}
        onChange={handleCommentChange}
        placeholder="Add a comment..."
      />
      <button className="comment-submit" type="submit">
        Submit
      </button>
      <button className="eliminate" onClick={handleDelete}> Delete!
      </button>

    </form>
  );
}

export default CommentBox;
