import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.ts";
import "./styles/App.css";

export default function App() {
    return <RouterProvider router={router} />;
}
