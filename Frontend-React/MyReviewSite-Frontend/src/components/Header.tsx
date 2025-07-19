import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface HeaderProps {
  auth: boolean;
  userDetails?: any;
}

function Header({auth, userDetails}: HeaderProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const location = useLocation();

  const logOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.ok) {
        console.log("Successfully Loged out !");
      } else {
        console.error("Logout failed with status:", response.status);
      }
    } catch (error) {
      console.error("Network error during logout:", error);
    }
  };

  return (
    <div className="card-header p-0">
      {/* ----------------- LOGO -----------------*/}
      <div className="d-flex justify-content-between align-items-center gap-1 mx-2">
        <div>
          <Link to="/">
            <img
              className="hover-inc"
              src="/imgs/logo3.png"
              height={"60px"}
              alt="Logo"
            ></img>
          </Link>
        </div>

        {/* ----------------- INPUT -----------------*/}
        <div className="d-flex gap-1">
          <div className="input-group">
            <input
              id="search-input"
              type="text"
              className="form-control"
              placeholder="Vyhledávání"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <button onClick={() => navigate(`/search?string=${encodeURIComponent(search)}`)} className="btn btn-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
              </svg>
            </button>
          </div>

          <button className="btn btn-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-wrench-adjustable-circle"
              viewBox="0 0 16 16"
            >
              <path d="M12.496 8a4.5 4.5 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11q.04.3.04.61"></path>
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-1 0a7 7 0 1 0-13.202 3.249l1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.5 4.5 0 0 1-1.592-.29L4.747 14.2A7 7 0 0 0 15 8m-8.295.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27z"></path>
            </svg>
          </button>
        </div>

        {/* ----------------- ACCOUNT -----------------*/}
        <div>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-success dropdown-toggle d-flex align-items-center gap-1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                ></path>
              </svg>
              <div className="d-none d-md-block">{auth ?  userDetails?.fullName : "My Account"}</div>
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={!auth ? "/login" : location.pathname + location.search} style={auth ? {textDecoration: "line-through"} : {textDecoration: "none"}}>
                  Login
                </Link>
              </li>
              <li>
                <a className="dropdown-item" href="" style={{textDecoration: "line-through"}}>
                  Sign up
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="" style={{textDecoration: "line-through"}}>
                  Forgotten password
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to={auth ? "/" : location.pathname + location.search} onClick={logOut}  style={!auth ? {textDecoration: "line-through"} : {textDecoration: "none"}}>
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
