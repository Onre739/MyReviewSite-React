import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="card-footer p-2">
      <nav className="d-flex justify-content-center">
        <Link
          to="/about"
          className="text-secondary link-success text-decoration-none"
        >
          About
        </Link>
      </nav>
    </div>
  );
}

export default Footer;
