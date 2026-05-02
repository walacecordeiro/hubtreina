"use client";

import { gql, TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { CardAllCourses } from "@/components/myComponents/CardAllCourses/page";

type FeaturedCoursesQuery = {
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
        }>;
      };
      slug: string;
    }>;
  };
};

const featuredCoursesQuery: TypedDocumentNode<FeaturedCoursesQuery> = gql`
  query featuredPosts {
    posts(where: { categoryName: "Destaque" }) {
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
          }
        }
        slug
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(featuredCoursesQuery);

  return (
    <main className="min-h-screen bg-sidebar">
      <section className="container mx-auto px-4 py-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
              Plataforma de cursos
            </span>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Aprenda com cursos práticos e transforme seu conhecimento em
              projetos reais.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              HubTreina reúne cursos de programação, design, marketing e mais,
              com conteúdo atualizado e foco em resultados. Explore, aprenda e
              avance no seu ritmo.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/cursos">
                <Button className="min-w-45 bg-sidebar-primary cursor-pointer">
                  Ver todos os cursos
                </Button>
              </Link>
              <Button variant="outline" asChild>
                <Link href="#featured">Cursos em destaque</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-background p-6 shadow-sm">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-accent text-accent-foreground">
                  📚
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    O que oferecemos
                  </p>
                  <p className="mt-2 text-lg font-semibold text-card-foreground">
                    Cursos modernos e práticos para você evoluir hoje.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-muted p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    +120 cursos
                  </p>
                  <p className="mt-2 text-lg font-semibold text-card-foreground">
                    Conteúdo atualizado
                  </p>
                </div>
                <div className="rounded-3xl bg-muted p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Projetos reais
                  </p>
                  <p className="mt-2 text-lg font-semibold text-card-foreground">
                    Aprenda praticando
                  </p>
                </div>
                <div className="rounded-3xl bg-muted p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Flexível
                  </p>
                  <p className="mt-2 text-lg font-semibold text-card-foreground">
                    Estude no seu ritmo
                  </p>
                </div>
                <div className="rounded-3xl bg-muted p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Acesso rápido
                  </p>
                  <p className="mt-2 text-lg font-semibold text-card-foreground">
                    Cursos e páginas com navegação simples
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="container mx-auto px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Cursos em destaque
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">
              O melhor conteúdo para começar agora
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Explore cursos selecionados e veja o que está disponível hoje na
            plataforma.
          </p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Carregando cursos...</p>
        ) : error ? (
          <p className="text-destructive">
            Erro ao carregar cursos: {error.message}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data?.posts?.nodes.slice(0, 3).map((course) => (
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
