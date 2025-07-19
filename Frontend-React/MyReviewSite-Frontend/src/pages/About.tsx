import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

interface AboutProps {
  auth: boolean;
  userDetails?: any;
}

function About({auth, userDetails}: AboutProps) {
  // Návrat
  return (
    <>
      <div className="card main-card mt-3">
        <Header auth={auth} userDetails={userDetails}></Header>

        <div className="card-body">
          <div className="card">
            <h5 className="card-header">About this project:</h5>
            <div className="card-body">
              <div className="mb-1">Tento projekt vznikl za účelem seznámení se s Spring frameworkem, Reactem a také k zužitkování znalostí získaných studiem na VŠB. 
                Jde o informační systém pro recenzování her a jejich dlc.</div>
              <b>V projektu byl použito:</b>
              <ul>
                <li>Bootstrap - vylepšení vizuálu</li>
                <li>React</li>
                <li>Framework Spring, Spring Boot</li>
                <li>SQLite databáze</li>
                <li>Maven</li>
                <li>Hibernate - ORM</li>
                <li>Hosting zdarma přes render.com</li>
                <li>Nasazení pomocí Docker</li>
                <li>
                  <a href="https://github.com/Onre739/MyReviewSite-React.git">Git/GitHub - verzování</a></li>
              </ul>
            </div>
          </div>
          
        </div>

        <Footer></Footer>
      </div>
    </>
  );
}

export default About;
