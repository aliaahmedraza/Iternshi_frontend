// Second final 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import Cookies from "js-cookie";
// import {jwtDecode} from "jwt-decode";

// const PostDetails = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Get token and decode to extract userId
//   const token = Cookies.get("loginUser");
//   let userId = null;
//   if (token) {
//     try {
//       const decoded = jwtDecode(token);
//       userId = decoded.id; // Adjust this if your token structure differs
//     } catch (err) {
//       console.error("Error decoding token", err);
//     }
//   }

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3004/api/posts/${id}`
//         );
//         setPost(response.data);
//       } catch (err) {
//         setError(err.message || "Error fetching post");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   const handleLike = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3004/api/posts/${id}/like`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );
//       console.log("Like clicked", response.data);
//       // Optionally update UI state here
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const handleDislike = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3004/api/posts/${id}/dislike`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );
//       console.log("Dislike clicked", response.data);
//       // Optionally update UI state here
//     } catch (error) {
//       console.error("Error disliking post:", error);
//     }
//   };

//   const handleCommentSubmit = async (values, { resetForm }) => {
//     try {
//       // Prepare payload with userId and comment text
//       const payload = { userId, comment: values.comment };
//       const response = await axios.post(
//         `http://localhost:3004/api/posts/${id}/comments`,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );
//       console.log("Comment added", response.data);
//       resetForm();
//       // Optionally, refresh post details to show the new comment
//     } catch (err) {
//       console.error("Error adding comment", err);
//     }
//   };

//   if (loading) return <div>Loading post details...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!post) return <div>No post found.</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
//       <p className="mb-4">{post.content}</p>
//       <div className="mb-4 text-sm text-gray-500">
//         <strong>Author:</strong> {post.author?.name || "Unknown"}
//       </div>
//       <div className="mb-4">
//         <button
//           onClick={handleLike}
//           className="mr-4 bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Like
//         </button>
//         <button
//           onClick={handleDislike}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Dislike
//         </button>
//       </div>
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-4">Comments</h2>
//         {post.comments && post.comments.length > 0 ? (
//           post.comments.map((comment) => (
//             <div key={comment._id} className="border-b py-2">
//               <strong>{comment.user?.name || "Anonymous"}:</strong>{" "}
//               {comment.comment}
//             </div>
//           ))
//         ) : (
//           <p>No comments yet.</p>
//         )}
//       </div>
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
//         <Formik initialValues={{ comment: "" }} onSubmit={handleCommentSubmit}>
//           {({ isSubmitting }) => (
//             <Form>
//               <div className="mb-4">
//                 <Field
//                   type="text"
//                   name="comment"
//                   placeholder="Your comment"
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit Comment"}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default PostDetails;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";

// const PostDetails = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   // Get token and decode to extract userId
//   const token = Cookies.get("loginUser");
//   let userId = null;
//   if (token) {
//     try {
//       const decoded = jwtDecode(token);
//       userId = decoded.id; // Adjust based on your token structure
//     } catch (err) {
//       console.error("Error decoding token", err);
//     }
//   }

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3004/api/posts/${id}`
//         );
//         setPost(response.data);
//       } catch (err) {
//         setError(err.message || "Error fetching post");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   const handleLike = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3004/api/posts/${id}/like`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Like clicked", response.data);
//       // Optionally update UI state here (e.g., re-fetch the post)
//     } catch (error) {
//       console.error("Error liking post:", error);
//     }
//   };

//   const handleDislike = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3004/api/posts/${id}/dislike`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Dislike clicked", response.data);
//       // Optionally update UI state here
//     } catch (error) {
//       console.error("Error disliking post:", error);
//     }
//   };

//   const handleCommentSubmit = async (values, { resetForm }) => {
//     try {
//       // Prepare payload with userId and comment text
//       const payload = { userId, comment: values.comment };
//       const response = await axios.post(
//         `http://localhost:3004/api/posts/${id}/comments`,
//         payload,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log("Comment added", response.data);
//       resetForm();
//       // Optionally update local state or re-fetch post details to show the new comment
//     } catch (err) {
//       console.error("Error adding comment", err);
//     }
//   };

//   if (loading) return <div>Loading post details...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!post) return <div>No post found.</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
//       <p className="mb-4">{post.content}</p>
//       <div className="mb-4 text-sm text-gray-500">
//         <strong>Author:</strong> {post.author?.name || "Unknown"}
//       </div>
//       <div className="mb-4">
//         <button
//           onClick={handleLike}
//           className="mr-4 bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Like
//         </button>
//         <button
//           onClick={handleDislike}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Dislike
//         </button>
//       </div>
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-4">Comments</h2>
//         {post.comments && post.comments.length > 0 ? (
//           post.comments.map((comment) => (
//             <div key={comment._id} className="border-b py-2">
//               <strong>{comment.user?.name || "Anonymous"}:</strong>{" "}
//               {comment.comment}
//             </div>
//           ))
//         ) : (
//           <p>No comments yet.</p>
//         )}
//       </div>
//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
//         <Formik initialValues={{ comment: "" }} onSubmit={handleCommentSubmit}>
//           {({ isSubmitting }) => (
//             <Form>
//               <div className="mb-4">
//                 <Field
//                   type="text"
//                   name="comment"
//                   placeholder="Your comment"
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit Comment"}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default PostDetails;

// final 
 import React, { useEffect, useState } from "react";
 import axios from "axios";
 import { useParams } from "react-router-dom";
 import { Formik, Form, Field } from "formik";
 import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

 const PostDetails = () => {
   const { id } = useParams();
   const [post, setPost] = useState(null);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(true);

   // Get token from cookies
   const token = Cookies.get("token");

   useEffect(() => {
     const fetchPost = async () => {
       try {
         const response = await axios.get(
           `http://localhost:3004/api/posts/${id}`
         );
         setPost(response.data);
       } catch (err) {
         setError(err.message || "Error fetching post");
       } finally {
         setLoading(false);
       }
     };

     fetchPost();
   }, [id]);

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
       // Optionally update the post state after liking
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
       // Optionally update the post state after disliking
     } catch (error) {
       console.error("Error disliking post:", error);
     }
   };

   const handleCommentSubmit = async (values, { resetForm }) => {
     try {
       // Only send the comment text; userId is derived from the token on the backend.
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
       resetForm();
       // Optionally update local post state to include the new comment
     } catch (err) {
       console.error("Error adding comment", err);
     }
   };

   if (loading) return <div>Loading post details...</div>;
   if (error) return <div>Error: {error}</div>;
   if (!post) return <div>No post found.</div>;

   return (
     <div className="container mx-auto p-4">
       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
       <p className="mb-4">{post.content}</p>
       <div className="mb-4 text-sm text-gray-500">
         <strong>Author:</strong> {post.author?.name || "Unknown"}
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
             <div key={comment._id} className="border-b py-2">
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
     </div>
   );
 };

 export default PostDetails;
