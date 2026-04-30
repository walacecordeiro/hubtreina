"use client";

import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import parse from "html-react-parser";
import { CardAllCourses } from "@/components/myComponents/CardAllCourses/page";

type GetCoursesInventoryQuery = {
  posts: {
    nodes: Array<{
      title: string;
      excerpt: string;
      featuredImage: {
        node: {
          link: string | null;
        };
      };
    }>;
  };
};

type GetCoursesInventoryQueryVariables = Record<string, never>;

const coursesQuery: TypedDocumentNode<
  GetCoursesInventoryQuery,
  GetCoursesInventoryQueryVariables
> = gql`
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
  const { loading, error, data } = useQuery(coursesQuery);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.posts) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.posts.nodes.map((course) => (
        <CardAllCourses
          key={course.title}
          imageSrc={course.featuredImage?.node?.link || ""}
          imageAlt={course.title}
          title={course.title}
          description={parse(course.excerpt)}
          buttonText="Ver curso"
        />
      ))}
    </div>
  );
}
