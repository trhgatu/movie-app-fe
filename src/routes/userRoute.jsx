import { DefaultLayout } from "../components/Layouts";
import HomePage from "../pages/HomePage";
import MoviesPage from "../pages/MoviesPage";
import MovieDetailPage from "../pages/MovieDetail";
import WatchMoviePage from "../pages/WatchMoviePage";
export const userRoute = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/movies",
                element: <MoviesPage />,
            },
            {
                path: "/movies/:type",
                element: <MoviesPage />
            },
            {
                path: "/movie/:slug",
                element: <MovieDetailPage />
            },
            {
                path:"/watch/:slug/:episodeSlug",
                element: <WatchMoviePage/>
            }
        ]
    },
];
