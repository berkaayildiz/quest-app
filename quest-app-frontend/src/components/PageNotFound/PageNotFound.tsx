import { Link } from "react-router-dom";


export default function PageNotFound()
{
  return (
    <div className="flex min-h-[86vh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <img src="src/assets/undraw_page_not_found.svg" width={300} height={300} alt="404 Illustration" className="mx-auto mb-6" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops! Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't seem to exist. Don't worry, we'll help you find your way back home.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}