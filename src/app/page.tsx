"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import parse from "html-react-parser";

const postsQuery = gql`
  query Posts {
    posts {
      nodes {
        title
        content
      }
    }
  }
`;

type PostsQueryResult = {
  posts: {
    nodes: {
      title: string;
      content: string; 
    }[];
  };
};

export default function Home() {
  const { loading, error, data } = useQuery<PostsQueryResult>(postsQuery);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.posts) return null;

  return data.posts.nodes.map((post) => (
  <div key={post.title} className="mb-4">
    <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
    <div className="teste">{parse(post.content)}</div>
  </div>
));
}
