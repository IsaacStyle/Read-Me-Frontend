import { useEffect, useRef, useState, useContext } from "react";
import "./PostModal.css";
import { updatePost,getPost,getPosts } from "../../services/posts";
import CommentBox from "./CommentBox";

import { createComment, getComments } from "../../services/comments";
import { UserContext } from "../../contexts/userContext";


function PostModal({ modalPost, posts, setPosts, displayModal, setDisplayModal, setModalPost, comments, setComments, banana, refresh, setRefresh }) {
    const body = document.querySelector("body");

    const handleClose = () => {
        setDisplayModal(false);
        setUpvoteCheck(true)
        setDownvoteCheck(true)
        body.classList.remove('freeze-body');
    };

    const [modalState, setModalState] = useState({})
    const [voteHelp,setVoteHelp] = useState(new Audio("https://us-tuna-sounds-files.voicemod.net/af1fea8c-7061-423d-9f14-21c73cf7acd0-1656841686081.mp3"))
    const [voteHelp2,setVoteHelp2] = useState(new Audio("https://www.myinstants.com/media/sounds/taco-bell-bong-sfx.mp3"))
    const [upvoteCheck,setUpvoteCheck] = useState(true)
    const [downvoteCheck,setDownvoteCheck] = useState(true)
    
    useEffect(() => {
        setModalState(modalPost)
    }, [modalPost])

    const handleUpVote = async () => {
        if (upvoteCheck) {
            console.log(modalState)
            let newUpVotes = modalPost.up_votes + 1

            try {
                const response = await updatePost(modalPost.id, {...modalPost, up_votes: newUpVotes});
                console.log("update post response:", response); 
                const responsePosts = await getPost(modalPost.id);
                setModalPost(responsePosts);
                setUpvoteCheck(false);
            } catch (error) {
                console.log("update post error:", error);
            }
        }
    };

    const handleDownVote = async () => {
        if (downvoteCheck) {
            console.log(modalState);
            let newDownVotes = modalPost.down_votes + 1;
            try {
                const response = await updatePost(modalPost.id, {...modalState, down_votes: newDownVotes});
                console.log("update post response:", response); 
                const responsePosts = await getPost(modalPost.id);
                setModalPost(responsePosts);
                setDownvoteCheck(false);
            } catch (error) {
                console.log("update post error:", error);
            }
        }
  };


    


    const handleAddComment = async (newComment) => {
        try {
            const response = await addComment(newComment);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const addComment = async (newComment) => {
        try {
            const response = await fetch("/api/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newComment),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    if (displayModal) {
        body.classList.add("freeze-body");
    }

    return (
        <div className={displayModal ? "post-modal" : "hide-element"}>
            <div className="close-btn-container">
                <div className="modal-title">{modalPost.title}</div>
                <img className="modal-image" src={modalPost.img_url} />
                <div className="texts">
                    <div dangerouslySetInnerHTML={{ __html: modalPost.text }} />
                </div>
                <div className="votes-container">
                    <div id="votes-div">
                        <div className="votes">{modalState.up_votes}</div>
                        <button className="upvote-button" onClick={handleUpVote}>
                            Upvote
                        </button>
                    </div>
                    <div id="votes-div">
                        <div className="votes2">{modalState.down_votes}</div>
                        <button className="downvote-button" onClick={handleDownVote}>
                            Downvote
                        </button>
                    </div>
                </div>
                <div className="comments-container">
                    <div className="comments-title">Comments:</div>
                    <div className="comments-scrollable">
                        {comments
                                .filter((comment) => comment.post === modalPost.id)
                                .map((comment) => (
                                    <p key={comment.id} className="comment">{comment.comment}</p>
                                ))}
                    </div>
                </div>
                <CommentBox refresh={refresh} setRefresh={setRefresh} postId={modalPost.id} addComment={handleAddComment}  setComments={setComments}/>
                <svg className="close-post-modal" onClick={handleClose}>
                    <line
                        x1="6"
                        y1="30"
                        x2="20"
                        y2="10"
                        stroke="#ffffff        "
                        strokeWidth="3"
                    />
                    <line
                        x1="6"
                        y1="10"
                        x2="20"
                        y2="30"
                        stroke="#ffffff"
                        strokeWidth="3"
                    />
                </svg>
            </div>
        </div>
    );
}

export default PostModal;