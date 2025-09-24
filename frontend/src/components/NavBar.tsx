import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function NavBar() {
    return (
        <nav>
            <div>
                <Link to="/">
                    <Leaf />
                    <span>GreenRide</span>
                </Link>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/search">Find a Ride</Link>
                    </li>
                    <li>
                        <Link to="/publish">Publish Ride</Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/">Log In</Link>
                    </li>
                    <li>
                        <Link to="/">Sign Up</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
