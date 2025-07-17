import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import SearchItem from "../components/SearchItem.tsx";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function Login() {
  var location =  useLocation();
  var params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const res = await fetch('/api/login', {
      method: 'POST',
      body: formData,
      credentials: 'include', // kvůli JSESSIONID
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (res.ok) {
      console.log("LOGGED IN ✅");
      navigate('/'); // nebo jinam dle tvého routeru
    } else {
        console.log("NOT LOGGED IN ❌");
        navigate('/login?status=error')
    }
  };

  
  return (
    <>
      <div className="card main-card mt-3 w-auto">
        <Header></Header>

        <div className="card-body">

          <div className="card w-100">
            <h5 className="card-header">Login:</h5>

            <div className="card-body">

              <div className="row mb-3">
                <div className="col-3">Email</div>
                <div className="col-9">
                  <input type="email" id="username" className="form-control" onChange={(e) => {setEmail(e.target.value)}}></input>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3">Password</div>
                <div className="col-9">
                  <input type="password" id="password" className="form-control" onChange={(e) => {setPassword(e.target.value)}}></input>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <button type="submit" onClick={handleLogin} className="btn btn-success">Login</button>
                </div>
                <div className="col-9">
                  <div className= {params.get("status") == "error" ? "alert alert-danger d-flex align-items-center" : "alert alert-danger d-none d-flex align-items-center" } 
                       role="alert">
                    <svg height="16px" xmlns="http://www.w3.org/2000/svg" className="bi flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>   
                    <div>
                      Invalid email or password!
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

          </div>

        </div>

        <Footer></Footer>
      </div>
    </>
  );
}

export default Login;
