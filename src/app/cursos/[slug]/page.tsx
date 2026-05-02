"use client";

import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/app/loading";

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

  const post = data?.posts?.nodes?.[0];

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="w-full px-4 py-8 md:py-12 lg:py-14">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 md:mb-8 flex flex-col gap-4 md:gap-6 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Página do curso
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row w-full md:w-auto shrink-0">
              <Link href="/cursos" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto">
                  ← Voltar
                </Button>
              </Link>
            </div>
          </div>

          {loading ? (
            <Card className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-8 w-2/3 rounded-full mb-4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="border-destructive/20 bg-destructive/10">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Erro ao carregar
                </CardTitle>
                <CardDescription className="text-destructive/80 text-xs md:text-sm">
                  Algo deu errado ao buscar o conteúdo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-destructive text-sm md:text-base wrap-break-word">
                  {error.message}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="w-full md:w-auto"
                >
                  Tentar novamente
                </Button>
              </CardFooter>
            </Card>
          ) : !post ? (
            <Card className="border-border bg-muted">
              <CardHeader>
                <CardTitle className="text-lg md:text-2xl">
                  Não encontrado
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm md:text-base">
                  Verifique o link ou tente novamente.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/cursos" className="w-full">
                  <Button variant="outline" className="w-full">
                    Voltar aos cursos
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ) : (
            <Card className="overflow-hidden border-border bg-card shadow-sm">
              <CardHeader className="bg-muted p-4 md:p-6">
                <CardTitle className="text-2xl md:text-3xl lg:text-4xl text-foreground wrap-break-word">
                  {post.title}
                </CardTitle>
                <CardDescription className="mt-2 text-muted-foreground text-xs md:text-sm">
                  Conteúdo do curso
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 md:px-6 py-6 md:py-8">
                <div className="contentHeadless overflow-x-auto">
                  {parse(post.content)}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}
