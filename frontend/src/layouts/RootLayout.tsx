import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.tsx";

function RootLayout() {
    return (
        <div>
            <header>
                <NavBar />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                Making transportation sustainable, one ride at a time. © 2025
                GreenRide. All rights reserved.
            </footer>
        </div>
    );
}

export default RootLayout;
