import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";


export const SkeletonPost = () =>
{
  // Displays a skeleton post while the post is being fetched
  return (
    <Card className="w-full max-w-4xl rounded-lg m-2 mt-6">
      <CardHeader className="flex items-center gap-4 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
        <div className="w-3/5 grid gap-4 place-items-center">
          <Skeleton className="h-5 w-3/5"></Skeleton>
          <Skeleton className="h-3 w-1/5"></Skeleton>
        </div>
      </CardHeader>
      <CardContent className="p-4 mb-14">
        <div className="grid gap-4 place-items-center">
          <Skeleton className="h-3 w-4/5"></Skeleton>
          <Skeleton className="h-3 w-3/5"></Skeleton>
        </div> 
      </CardContent>
    </Card>
  );
}
