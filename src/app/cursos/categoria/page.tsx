"use client";

import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { CardAllCourses } from "@/components/myComponents/CardAllCourses/page";
import { Skeleton } from "@/components/ui/skeleton";

type CategoriesQuery = {
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
};

const categoriesQuery: TypedDocumentNode<CategoriesQuery> = gql`
  query GetCategories {
    categories {
      nodes {
        name
        slug
      }
    }
  }
`;

export default function Categorias() {
  const { loading, error, data } = useQuery(categoriesQuery);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="w-full px-4 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto">
          <div className="mb-6 md:mb-8 flex flex-col gap-4 md:gap-6 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Categorias
              </p>
              <h1 className="mt-2 md:mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground wrap-break-word">
                Explore por interesse
              </h1>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row w-full md:w-auto">
              <Link href="/cursos" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto">← Cursos</Button>
              </Link>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card p-4 md:p-6 shadow-sm">
                <Skeleton className="h-6 w-2/3 md:h-8" />
                <Skeleton className="h-4 w-full mt-3 md:mt-4" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 md:p-8 text-center">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">⚠️</div>
            <h3 className="text-base md:text-lg font-semibold text-destructive mb-2">
              Erro ao carregar
            </h3>
            <p className="text-destructive mb-4 text-sm md:text-base wrap-break-word">{error.message}</p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full md:w-auto"
            >
              Tentar novamente
            </Button>
          </div>
        ) : !data?.categories?.nodes?.length ? (
          <div className="rounded-lg border border-border bg-muted p-6 md:p-8 text-center">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">📭</div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
              Nenhuma categoria
            </h3>
            <p className="text-muted-foreground mb-4 text-sm md:text-base">
              Ainda não temos categorias disponíveis.
            </p>
            <Link href="/cursos" className="inline-block">
              <Button variant="outline">Voltar aos cursos</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.categories.nodes.map((category) => (
              <Link key={category.slug} href={`/cursos/categoria/${category.slug}`}>
                <div className="p-4 md:p-6 rounded-lg border border-border bg-card hover:bg-muted cursor-pointer transition-all hover:shadow-md hover:scale-105">
                  <h2 className="text-base md:text-xl font-bold text-foreground wrap-break-word">{category.name}</h2>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-3">
                    Clique para explorar
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
