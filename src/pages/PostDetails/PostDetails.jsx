import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, likePostAsync, commentOnPostAsync } from "../../redux/slices/blogPostSlice.js";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.posts.items.find((p) => p?._id === id)
  );
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!post) dispatch(fetchPosts());
  }, [dispatch, post]);

  const handleLike = () => {
    dispatch(likePostAsync({ postId: id, userId: "USER_ID" }));
  };

  const handleComment = () => {
    dispatch(commentOnPostAsync({ postId: id, userId: "USER_ID", text: comment }));
    setComment("");
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
      <button onClick={handleLike}>Like ({post?.likes?.length ?? 0})</button>
      <h3>Comments</h3>
      {post?.comments?.map((c, index) => (
        <p key={index}>{c?.text}</p>
      ))}
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button onClick={handleComment}>Comment</button>
    </div>
  );
};

export default PostDetails;