import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";
import "./styles/App.css";

export default function App() {
    return <RouterProvider router={router} />;
}
