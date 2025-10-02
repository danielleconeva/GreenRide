import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import SearchPage from "../pages/SearchPage";
import PublishPage from "../pages/PublishPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import RidesPage from "../pages/RidesPage";
import RideDetailsPage from "../pages/RideDetailsPage";
import RideEditPage from "../pages/RideEditPage";
import BookingDetailsPage from "../pages/BookingDetailsPage";
import BookingConfirmedPage from "../pages/BookingConfirmedPage";
import EcoImpactPage from "../pages/EcoImpactPage";
import ProfilePage from "../pages/ProfilePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "search", element: <SearchPage /> },
            { path: "rides", element: <RidesPage /> },
            { path: "rides/:id", element: <RideDetailsPage /> },
            { path: "rides/:rideId/edit", element: <RideEditPage /> },
            { path: "booking/:rideId", element: <BookingDetailsPage /> },
            {
                path: "booking-confirmed/:rideId",
                element: <BookingConfirmedPage />,
            },
            { path: "publish", element: <PublishPage /> },
            { path: "eco-impact", element: <EcoImpactPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <SignUpPage /> },
            { path: "profile", element: <ProfilePage /> },
        ],
    },
]);
