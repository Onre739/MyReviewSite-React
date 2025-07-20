import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import News from "../components/News.tsx";
import Graph from "../components/Graph.tsx";
import LatestReviews from "../components/LatestReviews.tsx";

import { useEffect, useState } from "react";
import type {HomeVarsType} from "../customTypes.tsx";

interface HomeProps {
  auth: boolean;
  userDetails?: any;
}

function Home({auth, userDetails}: HomeProps) {
  // Objekt pro globální proměnné
  var vars_obj: HomeVarsType = {
    graphGameId: 2,
    graphPlatformId1: 1,
    graphPlatformId2: 2,
    graphPlatformId3: 3,

    currentNewIndex: 0,
    news: null,
    gameReviews: null,
    newsPageSize: 3,
    gameReviewsPageSize: 4,

    graphReviews: [null, null, null],
  };
  
  // Nastavení objektu jako State
  const [vars, setVars] = useState<HomeVarsType>(vars_obj);
  
  // Zisk dat z API, spustí se 1 při spuštění
  useEffect(() => {
    console.log("Getting data");
    getData(vars, setVars);
  }, []);

  // Návrat
  return (
    <>
      <div className="card main-card mt-3">
        <Header auth={auth} userDetails={userDetails}></Header>

        <div className="card-body">
          <div className="row">
            <div className="col-12 col-lg-4 mb-3">
              <News vars={vars} setVars={setVars} ></News>
            </div>
            <div className="col-12 col-lg-8 mb-3">              
              <Graph gameReviews1={vars.graphReviews[0]} gameReviews2={vars.graphReviews[1]} gameReviews3={vars.graphReviews[2]}></Graph>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <LatestReviews vars={vars}></LatestReviews>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    </>
  );
}

async function getData(vars: HomeVarsType, setVars: any) {
  const url = `/api/index?newsPage=${0}
    &newsPageSize=${vars.newsPageSize}
    &gameReviewPage=${0}
    &gameReviewPageSize=${vars.gameReviewsPageSize}
    &graphGameId=${vars.graphGameId}
    &graphPlatformId1=${vars.graphPlatformId1}
    &graphPlatformId2=${vars.graphPlatformId2}
    &graphPlatformId3=${vars.graphPlatformId3}`;

  try {
    var response = await fetch(url);
    var data = await response.json();
    console.log("Aquired  data:");
    console.log(data);

    const newVars = {
      ...vars,
      news: data.news,
      gameReviews: data.gameReviews,
      graphReviews: [data.graphReviews1, data.graphReviews2, data.graphReviews3], 
    }

    setVars(newVars);

  } catch (error) {
    console.error("Chyba při načítání dat:", error);
  }
}

export default Home;
