import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardAllCoursesProps {
  imageSrc: string;
  imageAlt: string;
  badgeText?: string;
  title: string;
  description: string | React.ReactNode;
  buttonText: string;
  link: string;
}

export function CardAllCourses({
  imageSrc,
  imageAlt,
  badgeText = "Disponível",
  title,
  description,
  buttonText,
  link,
}: CardAllCoursesProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
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
        <div className="aspect-video w-full bg-gray-300 flex items-center justify-center text-gray-500">
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
      <CardFooter>
        <Button
          className="w-full cursor-pointer"
          onClick={() => (window.location.href = link)}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
