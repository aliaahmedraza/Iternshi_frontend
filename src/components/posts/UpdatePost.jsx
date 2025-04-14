import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Loader from "../Loader/Loader.jsx";

const UpdatePostSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

const UpdatePost = ({ postId, onCancel, onUpdate }) => {

  const tokenFromStore = useSelector((state) => state.user.token);
  console.log("Token from store:", tokenFromStore);

  let user = {};
  if (tokenFromStore) {
    try {
      user = { ...jwtDecode(tokenFromStore), token: tokenFromStore };
      console.log("Decoded user:", user);
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `https://internship-task-blogapp-1.onrender.com/api/posts/${postId}`
        );
        setInitialValues({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (err) {
        console.log(err.message || "Error fetching post details");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);
  
  if (!user || !user.id || !user.token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">
            You must be logged in to update a post.
          </h2>
          <p>Please log in first.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `https://internship-task-blogapp-1.onrender.com/api/posts/${postId}`,
        values,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Post updated successfully!");
      console.log("Update response:", response.data);
      if (onUpdate) onUpdate();
    } catch (error) {
      if (error.response && error.response.data) {
        alert(
          error.response.data.message ||
            "Error updating post. Please try again."
        );
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

 
  if (loading) return (<div className="flex justify-center items-center"><Loader/></div>) ;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Post</h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={UpdatePostSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 mb-2">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Post title"
                  className={`w-full p-2 border rounded-md ${
                    errors.title && touched.title
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.title}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 mb-2">
                  Content
                </label>
                <Field
                  as="textarea"
                  name="content"
                  placeholder="Post content"
                  className={`w-full p-2 border rounded-md ${
                    errors.content && touched.content
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.content && touched.content && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.content}
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Updating Post..." : "Update Post"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdatePost;
