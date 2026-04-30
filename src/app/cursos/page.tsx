"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import parse from "html-react-parser";
import { CardAllCourses } from "@/components/myComponents/CardAllCourses/page";

interface FeaturedImageNode {
  link: string;
}

interface FeaturedImage {
  node: FeaturedImageNode;
}

interface Post {
  title: string;
  excerpt: string;
  featuredImage: FeaturedImage | null;
}

interface PostsData {
  posts: {
    nodes: Post[];
  };
}

const postsQuery = gql`
  query Posts {
    posts {
      nodes {
        title
        excerpt
        # content
        featuredImage {
          node {
            link
          }
        }
      }
    }
  }
`;

export default function Cursos() {
  const { loading, error, data } = useQuery<PostsData>(postsQuery);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.posts) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.posts.nodes.map((post: Post) => (
        <CardAllCourses
          key={post.title}
          imageSrc={post.featuredImage?.node?.link ||""}
          imageAlt={post.title}
          title={post.title}
          description={parse(post.excerpt)}
          buttonText="Ver curso"
        />
      ))}
    </div>
  );
}
