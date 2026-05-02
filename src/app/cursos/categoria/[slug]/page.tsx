"use client";

import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { CardAllCourses } from "@/components/myComponents/CardAllCourses/page";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/app/loading";

type CategoryCoursesQuery = {
  posts: {
    nodes: Array<{
      title: string;
      excerpt: string;
      featuredImage: {
        node: {
          link: string | null;
        };
      } | null;
      categories: {
        nodes: Array<{
          name: string;
          slug: string;
        }>;
      };
      slug: string;
    }>;
  };
};

const categoryCoursesQuery: TypedDocumentNode<CategoryCoursesQuery> = gql`
  query PostsByCategory($categoryName: String!) {
    posts(where: { categoryName: $categoryName }) {
      nodes {
        title
        excerpt
        featuredImage {
          node {
            link
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        slug
      }
    }
  }
`;

export default function CategoriaPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { loading, error, data } = useQuery(categoryCoursesQuery, {
    variables: { categoryName: slug },
  });

  const categoryName =
    data?.posts?.nodes?.[0]?.categories?.nodes?.[0]?.name ||
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="w-full px-4 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto">
          <div className="mb-6 md:mb-8 flex flex-col gap-4 md:gap-6 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Cursos por categoria
              </p>
              <h1 className="mt-2 md:mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground wrap-break-word">
                {categoryName}
              </h1>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row w-full md:w-auto">
              <Link href="/cursos/categoria" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto">
                  ← Categorias
                </Button>
              </Link>
              <Link href="/cursos" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto">
                  Todos os cursos
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-6 md:mb-8 rounded-lg md:rounded-2xl bg-card p-4 md:p-6 shadow-sm">
          <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary">
                {data?.posts?.nodes?.length || 0}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
                Cursos
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary">
                📚
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
                Qualidade
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary">
                🎯
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">
                Prático
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-4 md:p-6 shadow-sm"
              >
                <Skeleton className="aspect-video w-full rounded-lg" />
                <div className="mt-3 md:mt-4 space-y-2 md:space-y-3">
                  <Skeleton className="h-5 md:h-6 w-3/4" />
                  <Skeleton className="h-3 md:h-4 w-full" />
                  <Skeleton className="h-3 md:h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 md:p-8 text-center">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">⚠️</div>
            <h3 className="text-base md:text-lg font-semibold text-destructive mb-2">
              Erro ao carregar
            </h3>
            <p className="text-destructive mb-4 text-sm md:text-base wrap-break-word">
              {error.message}
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full md:w-auto"
            >
              Tentar novamente
            </Button>
          </div>
        ) : !data?.posts?.nodes?.length ? (
          <div className="rounded-lg border border-border bg-muted p-6 md:p-8 text-center">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">📭</div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
              Nenhum curso
            </h3>
            <p className="text-muted-foreground mb-4 text-sm md:text-base">
              Estamos trabalhando na categoria de "{categoryName}". Traremos
              ótimas opções em breve!
            </p>
            <Link href="/cursos/categoria" className="inline-block">
              <Button variant="outline">Ver todas as categorias</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.posts.nodes.map((course) => (
              <CardAllCourses
                key={course.slug}
                imageSrc={course.featuredImage?.node?.link || ""}
                imageAlt={course.title}
                title={course.title}
                description={parse(course.excerpt)}
                badgeText={course.categories?.nodes[0]?.name || ""}
                link={`/cursos/${course.slug}`}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
