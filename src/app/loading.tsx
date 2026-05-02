import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-lg">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4 rounded-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
