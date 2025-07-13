import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import News from "../components/News.tsx";
import Graph from "../components/Graph.tsx";
import LatestReviews from "../components/LatestReviews.tsx";

import { useEffect, useState } from "react";
import type {HomeVarsType, setNewVarsType} from "../customTypes.tsx";

function Home() {
  // Objekt pro globální proměnné
  var vars_obj: HomeVarsType = {
    myChart: null,
    chartColor: ["rgb(17, 120, 44)", "rgb(255, 0, 102)", "rgb(0, 102, 255)"],
    chartData: [[], [], []],
    labels: [[], [], []],
    platformNames: ["PC", "PlayStation 5", "Xbox Series X"],
    currentChart: 0,
    chartsNum: 3,

    graphGameId: 2,
    graphPlatformId1: 1,
    graphPlatformId2: 2,
    graphPlatformId3: 3,

    currentNewIndex: 0,
    news: null,
    gameReviews: null,
    newsPageSize: 3,
    gameReviewsPageSize: 4,
  };
  
  // Nastavení objektu jako State
  const [vars, setVars] = useState<HomeVarsType>(vars_obj);
  
  // Arrow funkce pro změnu nového stavu
  const setNewVars:setNewVarsType = (id: string, value: any) => {
    setVars(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  // Zisk dat z API, spustí se 1 při spuštění
  useEffect(() => {
    console.log("Getting data");
    getData(vars, setNewVars);
  }, []);

  // Funkce pro potomky
  const setCurrentNewIndex = (value: number) => {setNewVars("currentNewIndex", value)};
  
  // Návrat
  return (
    <>
      <div className="card main-card mt-3">
        <Header></Header>

        <div className="card-body">
          <div className="row">
            <div className="col-12 col-lg-4 mb-3">
              <News vars={vars} setCurrentNewIndex={setCurrentNewIndex} ></News>
            </div>
            <div className="col-12 col-lg-8">
              <Graph></Graph>
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

async function getData(vars: HomeVarsType, setNewVars: setNewVarsType) {
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

    // Novinky
    setNewVars("news", data.news);

    // Nejnovější recenze
    setNewVars("gameReviews", data.gameReviews);

    // Recenze pro graf
    let chartData: any = [[],[],[]];
    let labels: any = [[],[],[]];

    data.graphReviews1.forEach(function (rev: any) {
      chartData[0].push(rev.numerical_rev);
      labels[0].push(rev.time.split("T")[0]);
    });
    

    data.graphReviews2.forEach(function (rev: any) {
      chartData[1].push(rev.numerical_rev);
      labels[1].push(rev.time.split("T")[0]);
    });

    data.graphReviews3.forEach(function (rev: any) {
      chartData[2].push(rev.numerical_rev);
      labels[2].push(rev.time.split("T")[0]);
    });

    setNewVars("chartData", chartData);
    setNewVars("labels", labels);
    
  } catch (error) {
    console.error("Chyba při načítání dat:", error);
  }
}

export default Home;
