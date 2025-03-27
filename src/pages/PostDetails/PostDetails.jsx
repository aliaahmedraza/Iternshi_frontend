import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import UpdatePost from "../../components/posts/UpdatePost.jsx";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [toggleMessage, setToggleMessage] = useState("");

  const token = Cookies.get("token");
  const loggedInUserId = token ? jwtDecode(token).id : null;

  const showMessage = (msg) => {
    setToggleMessage(msg);
    setTimeout(() => setToggleMessage(""), 3000);
  };

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/api/posts/${id}`);
      setPost(response.data);
      console.log(response);
    } catch (err) {
      setError(err.message || "Error fetching post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  const isPostAuthor = () => {
    if (!post || !post.author) return false;
    if (typeof post.author === "string") {
      return post.author === loggedInUserId;
    }
    if (typeof post.author === "object" && post.author._id) {
      return post.author._id.toString() === loggedInUserId;
    }
    return false;
  };

  if (isUpdating) {
    return (
      <UpdatePost
        postId={id}
        onCancel={() => setIsUpdating(false)}
        onUpdate={() => {
          setIsUpdating(false);
          fetchPostDetails();
        }}
      />
    );
  }

  const handleLike = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3004/api/posts/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("Like clicked", response.data);
      setPost(response.data);
      showMessage("Post liked!");
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3004/api/posts/${id}/dislike`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("Dislike clicked", response.data);
      setPost(response.data);
      showMessage("Post disliked!");
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const handleCommentSubmit = async (values, { resetForm }) => {
    try {
      const payload = { comment: values.comment };
      const response = await axios.post(
        `http://localhost:3004/api/posts/${id}/comments`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("Comment added", response.data);
      setPost(response.data);
      resetForm();
      showMessage("Comment added!");
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  const handleUpdate = () => {
    setIsUpdating(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3004/api/posts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("Post deleted", response.data);
      showMessage("Post deleted!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Error deleting post", err);
    }
  };
  const handleNavigation = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading post details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="border-2 p-6 flex justify-between mb-2">      {toggleMessage && (
        <div className="mb-4 p-2 bg-yellow-200 text-yellow-800 text-center rounded">
          {toggleMessage}
        </div>
      )}
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Title:{post.title}</h1>
      <p className="mb-4">Content: {post.content}</p>
      <div className="mb-4 text-sm text-gray-500">
        <strong>Author:</strong> {post.author?.name || "Unknown"}
      </div>
      <h1 className="mb-4 text-lg font-semibold text-gray-800">
  Created At: {post?.createdAt ? new Date(post.createdAt).toLocaleString() : 'Date not available'}
          </h1>
        </div>

        <div className="flex items-end">
               {loggedInUserId && isPostAuthor() && (
        <div className="mb-4">
          <button
            onClick={handleUpdate}
            className="mr-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Post
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Post
          </button>
        </div>
      )}
        </div>
      </div>


      <div className="mb-4">
        <button
          onClick={handleLike}
          className="mr-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Like
        </button>
        <button
          onClick={handleDislike}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Dislike
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment._id} className="border-1 py-2">
              <strong>{comment.user?.name || "Anonymous"}:</strong>{" "}
              {comment.comment}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
        <Formik initialValues={{ comment: "" }} onSubmit={handleCommentSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  name="comment"
                  placeholder="Your comment"
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isSubmitting ? "Submitting..." : "Submit Comment"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex flex-row-reverse items-end">
        <button
          onClick={handleNavigation}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
