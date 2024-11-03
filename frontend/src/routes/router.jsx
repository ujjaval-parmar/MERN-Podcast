import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layout/AuthLayout";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import CategoriesPage from "../pages/CategoriesPage";
import ProfilePage from "../pages/ProfilePage";
import AddPodcastPage from "../pages/AddPodcastPage";
import AllPodcasts from "../pages/AllPodcasts";
import CategoryPodcastPage from "../pages/CategoryPodcastPage";
import PodcastDetailPage from "../pages/PodcastDetailPage";

const router = createBrowserRouter([

    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <MainLayout />,
                children: [
                    {
                        path: '/',
                        element: <HomePage />
                    },
                    {
                        path: '/categories',
                        element: <CategoriesPage />
                    },
                    {
                        path: '/profile',
                        element: <ProfilePage />
                    },
                    {
                        path: '/add-podcast',
                        element: <AddPodcastPage />
                    },
                    {
                        path: '/all-podcasts',
                        element: <AllPodcasts />
                    },
                    {
                        path: '/categories/:categoryName',
                        element: <CategoryPodcastPage />
                    },
                    {
                        path: '/podcast/:podcastId',
                        element: <PodcastDetailPage />
                    },

                ]
            },
            {
                path: '',
                element: <AuthLayout />,
                children: [
                    {
                        path: '/sign-up',
                        element: <SignupPage />
                    },
                    {
                        path: '/login',
                        element: <LoginPage />
                    }
                ]
            }
        ],

        errorElement: <ErrorPage />
    }



])

export default router;