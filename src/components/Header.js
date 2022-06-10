import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Link to="/">Home</Link>
            <br />
            <Link to="/create">Create</Link>
            <br />
            <Link to="/answer">Answer</Link>
            <br />
            <Link to="/results">Results</Link>
        </div>
    )
}

export default Header;