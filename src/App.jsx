import  {lazy, Suspense} from "react";
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import LoadingPage from "./sharedView/loading-pages/LoadingPage.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PostPage from "./sharedView/post/pages/PostPage.jsx";



const LazyAuthPage = lazy(() => import("./sharedView/login/pages/AuthPage.jsx"));
const LazyNotFoundPage = lazy(() => import("./sharedView/error-pages/NotFoundPage.jsx"));
const LazyLogInPage = lazy(() => import("./sharedView/login/pages/LogInPage.jsx"));
const LazySignUpPage = lazy(() => import("./sharedView/signUp/pages/SignUpPage.jsx"));
const LazyMainPage = lazy(() => import("./sharedView/main/pages/MainPage.jsx"));
const LazyHomePage = lazy(() => import("./sharedView/home/pages/HomePage.jsx"));
const LazyExplorePage = lazy(() => import("./sharedView/explore/pages/ExplorePage.jsx"));
const ProfilePage = lazy(() => import("./sharedView/profile/pages/ProfilePage.jsx"));
const LazyChatPage = lazy(() => import("./sharedView/chat/Chat.jsx"));
const LazyInbox = lazy(() => import("./sharedView/chat/pages/Inbox.jsx"));
const LazyDirect = lazy(() => import("./sharedView/chat/pages/Direct.jsx"));
const LazyProfilePosts = lazy(() => import("./sharedView/profile/components/ProfilePosts.jsx"));
const LazyProfileLikedPosts=lazy(()=>import("./sharedView/profile/components/ProfileLikedPosts.jsx"))
const LazyProfileSavedPosts=lazy(()=>import("./sharedView/profile/components/ProfileSavedPosts.jsx"))


const router = createBrowserRouter([

    {
        path: "/",
        element: <PublicRoute/>,
        errorElement: <LazyNotFoundPage />,

        children:[
            {
                path: "",
                element: <LazyAuthPage />,

            },
            {
                path: "/accounts/login",
                element: <LazyLogInPage />
            },
            {
                path: "/accounts/signup",
                element: <LazySignUpPage />
            },
        ]
    },


    {
        path: "/main",
        element:<PrivateRoute/>,

        children:[
            {
                path: "",
                element: <LazyMainPage />,


                children: [
                    { index: true,
                        element: <Navigate to="home"  />
                    },
                    {
                        path:"home",
                        element: <LazyHomePage />,

                    },
                    {
                        path: "explore",
                        element: <LazyExplorePage />
                    },
                    {
                        path: "chat",
                        element: <LazyChatPage />,
                        children:[
                            { index: true,
                                element: <Navigate to="inbox"  />
                            },
                            {
                                path: "inbox",
                                element: <LazyInbox />
                            },
                            {
                                path: "d/:id",
                                element: <LazyDirect />
                            }
                        ]
                    },
                    {
                        path:'p/:id',
                        element:<PostPage />
                    },
                    {
                        path: "profile/:username",
                        element: <ProfilePage />,
                        errorElement: <LazyNotFoundPage />,
                        children:[
                            { index: true,
                                element: <Navigate to="posts"  />
                            },
                            {
                                path:"posts",
                                element:<LazyProfilePosts />
                            },
                            {
                                path:"liked",
                                element:<LazyProfileLikedPosts />
                            },
                            {
                                path:"saved",

                                element:<LazyProfileSavedPosts />
                            }
                        ]
                    }
                ]
            }
        ]
    },


]);

function App() {
    return (
         <Suspense fallback={<LoadingPage />}>
            <RouterProvider router={router}>
                <Outlet />
            </RouterProvider>
        </Suspense>
    );
}

export default App;
