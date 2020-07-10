import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import PostForm from "./PostForm";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    insert_posts(objects: { title: $title, body: $body }) {
      affected_rows
    }
  }
`;

function NewPost() {
  const history = useHistory();
  const [createPost, { loading, error }] = useMutation(CREATE_POST, {
    onCompleted: () => history.push("/")
  });

  function onSave({ title, body }) {
    createPost({ variables: { title, body } });
  }

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <header className="bg-gray-300 text-gray-700 py-3 px-4">
        <h2 className="text-sm font-semibold">New Post</h2>
      </header>
      <div className="bg-gray-100 p-4">
        <PostForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default NewPost;
