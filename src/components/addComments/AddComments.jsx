import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CommentSchema = Yup.object().shape({
  comment: Yup.string().required("Comment is required"),
});

const AddComment = ({ post_id, userId }) => {
  const initialValues = {
    comment: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        `http://localhost:3004/api/posts/${post_id}/comments`,
        {
          userId,
          comment: values.comment,
        }
      );
      alert(response.data.message || "Comment added successfully!");
      resetForm();
    } catch (error) {
      if (error.response && error.response.data) {
        alert(
          error.response.data.message ||
            "Error adding comment. Please try again."
        );
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add a Comment</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={CommentSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 mb-2">
                  Comment
                </label>
                <Field
                  type="text"
                  name="comment"
                  placeholder="Write your comment here"
                  className={`w-full p-2 border rounded-md ${
                    errors.comment && touched.comment
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.comment && touched.comment && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.comment}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default AddComment;
