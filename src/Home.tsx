import { FC, ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./context/userContext";
import './Home.css';

/**
 * / route, home page component
 * @returns 
 */
const Home: FC = () => {
    let userHtml: ReactElement | null = null;

    const loginUser = useContext(UserContext).loginUser;

    if (loginUser) {

        userHtml = (
            <div className="display-4 p-2">
                Welcome back,
                {loginUser.lastName} {loginUser.firstName}!
            </div>
        );
    } else {
        userHtml = (
            <div className="p-2">
                <Link to="/login" className="btn btn-primary btn-lg mx-2">Login</Link>
                <Link to="/signup" className="btn btn-primary btn-lg mx-2">Singup</Link>
            </div>
        );
    }
    return (
        <div className="Home d-flex flex-column justify-content-center text-center">
            <div className="display-2 p-2">Jobly</div>
            <div className="display-5 p-2">All the jobs in one convenient place.</div>
            {userHtml}
        </div>
    );
}

export default Home;