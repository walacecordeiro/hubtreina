"use client";

import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";
import parse from "html-react-parser";

type GetCourseInventoryQuery = {
  posts: {
    nodes: Array<{
      title: string;
      content: string;
    }>;
  };
};

const courseQuery: TypedDocumentNode<GetCourseInventoryQuery> = gql`
  query Post($slug: String!) {
    posts(where: { name: $slug }, first: 1) {
      nodes {
        title
        content
      }
    }
  }
`;

export default function CursoPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { loading, error, data } = useQuery(courseQuery, {
    variables: { slug },
  });

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.posts?.nodes?.[0]) return <p>Curso não encontrado</p>;

  const post = data.posts.nodes[0];

  return (
    <div className="container mx-auto lg:w-[80%]">
      <h1 className="mb-4 text-lg md:text-2xl">{post.title}</h1>
      <div className="contentHeadless">{parse(post.content)}</div>
    </div>
  );
}
