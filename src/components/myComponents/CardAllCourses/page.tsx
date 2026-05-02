import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface CardAllCoursesProps {
  imageSrc: string;
  imageAlt: string;
  badgeText?: string;
  title: string;
  description: string | React.ReactNode;
  link: string;
}

export function CardAllCourses({
  imageSrc,
  imageAlt,
  badgeText = "Disponível",
  title,
  description,
  link,
}: CardAllCoursesProps) {
  return (
    <Link href={link}>
      <Card className="relative mx-auto w-full max-w-sm pt-0 cursor-pointer transition-all hover:shadow-lg hover:scale-105">
        {imageSrc ? (
          <>
            <div className="absolute z-30 aspect-video bg-black/35" />
            <img
              src={imageSrc}
              alt={imageAlt}
              className="relative z-20 aspect-video w-full object-cover"
            />
          </>
        ) : (
          <div className="aspect-video w-full bg-muted flex items-center justify-center text-muted-foreground">
            Imagem indisponível
          </div>
        )}
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">{badgeText}</Badge>
          </CardAction>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
