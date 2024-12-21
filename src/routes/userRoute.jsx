import { DefaultLayout } from "../components/Layouts";
import HomePage from "../pages/HomePage";
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
                path: "/movie/:slug",
                element: <MovieDetailPage />
            },
            {
                path:"/watch/:slug",
                element: <WatchMoviePage/>
            }
        ]
    },
];
