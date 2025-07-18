import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import GameReviewItem from "../components/GameReviewItem.tsx";
import MakeRev from "../components/MakeRev.tsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import type {GameVarsType, GameReview} from "../customTypes.tsx";

interface GameProps {
  auth: boolean;
  userDetails?: any;
}

function game({auth, userDetails}: GameProps) {
  var location =  useLocation();
  var params = new URLSearchParams(location.search);
  const id = params.get("id") ?? "";

  const vars_obj: GameVarsType = {
    game: null,
    gameReviews: [],
    platforms: [],
    subGenres: [],
    page: 0,
    maxPage: 1,
    pageSize: 5,
    makingRev: false,
  };

  // Nastavení objektu jako State
  const [vars, setVars] = useState<GameVarsType>(vars_obj);

  // Pokud dojde ke změně parametru URL pro vyhledávání
  useEffect(() => {
    const newVars = {
      ...vars,
      gameReviews: [],
      page: 0,
      maxPage: 1,
    };

    getData(newVars, setVars, id);

  }, [id]);

  // Viditelnost tlačítka na load more dat
  const checkBtnVisibility = vars.page < (vars.maxPage - 1) && (vars.gameReviews?.length ?? 0) > 0;
  
  // Pomocná funkce pro onclick na btn load more
  const loadMore = () => {
    const newVars = {
      ...vars,
      page: vars.page + 1,
    };

    getData(newVars, setVars, id);
  };

  // Callback pro tvorbu recenzí
  const goMakeRev = () => {
    const newVars = {
      ...vars,
      makingRev: true,
    };

    setVars(newVars);
  };

  // Callback pro list recenzí
  const goSeeRev = () => {
    const newVars = {
      ...vars,
      makingRev: false,
    };

    setVars(newVars);
  };

  return (
    <>
      
      <div className="card main-card mt-3">
        <Header auth={auth} userDetails={userDetails}></Header>

        <div className="card-body">

          {/* ----------- INFORMACE ----------- */}
          <div className="card w-100 mb-3">
            
            <h5 className="card-header">Info:</h5>
            
            <div className="card-body">
              <div className="mb-3 d-flex">
                <img id="game-img" className="me-3" src={vars.game?.img_path}></img>
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div>
                    <h5 id="game-name">{vars.game?.name}</h5>
                    <div className="d-flex gap-1">
                      <div>
                        <h6 className="dark-green">Developer:</h6>
                        <h6 className="dark-green">Release date:</h6>
                        <h6 className="dark-green">Publisher:</h6>
                        <h6 className="dark-green">Series:</h6>
                      </div>
                      <div>
                        <div id="game-developer">{vars.game?.developer.name}</div>
                        <div id="game-release-date">{vars.game?.release_date}</div>
                        <div id="game-publisher">{vars.game?.publisher}</div>
                        <div id="game-series">{vars.game?.series}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex">
                    <div className="me-2">
                      <h6 className="dark-green">Platforms:</h6>
                      <ul id="game-platforms-list" className="list-group list-group-flush">
                        {vars.platforms.map((platform) => { 
                          return <li key={platform.id} className="list-group-item">{platform.name}</li>
                        })}
                      </ul>
                    </div>
                    <div>
                      <h6 className="dark-green ps-3">Genres:</h6>
                      <ul id="game-subGenres-list" className="list-group list-group-flush border-start border-secondary-subtle ps-3">
                        {vars.subGenres.map((genre) => { 
                          return <li key={genre.id} className="list-group-item">{genre.name}</li>
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div id="game-description">{vars.game?.description}</div>
            </div>
          
          </div>

          {/* ----------- RECENZE ----------- */}
          <div className={vars.makingRev ? "card w-100 d-none" : "card w-100"}>
            
            <div className="card-header d-flex justify-content-between">
              <h5 className="">Reviews:</h5>
              <button id="game-make-review-btn" disabled={!auth} className={vars.makingRev ? "d-none" : "btn btn-success btn-sm text-nowrap"} 
                      onClick={goMakeRev}>Make Review</button>
            </div>

            <div className="card-body">
              <ul className="list-group list-group-flush">
                {vars.gameReviews.map((gameReview: GameReview) => {
                        return <GameReviewItem key={gameReview.id} gameReview={gameReview}></GameReviewItem>
                    })}
              </ul>
              <div id="game-nothing-div" className="alert alert-secondary d-none" role="alert">Nothing found :/</div>
              <div className="d-flex justify-content-center">
                <button id="game-more-btn" onClick={loadMore} className={checkBtnVisibility ? "btn btn-success btn-sm d-block" : "btn btn-success btn-sm d-none"}>Load More</button>
              </div>
            </div>

          </div>

          {/* ----------- TVORBA RECENZE ----------- */}
          <div className={vars.makingRev ? "card w-100" : "card w-100 d-none"}>
            
            <div className="card-header d-flex justify-content-between">
              <h5>Make a review:</h5>
              <button id="game-make-review-btn" className={vars.makingRev ? "btn btn-success btn-sm text-nowrap" : "d-none"} onClick={goSeeRev}>Back to reviews</button>
            </div>

            <div className="card-body">
              <MakeRev platforms={vars.platforms} auth={auth} userDetails={userDetails} game={vars.game}></MakeRev>
            
            </div>

          </div>

        </div>

        <Footer></Footer>
      </div>
    
    </>
  );
}

async function getData(vars: GameVarsType, setVars: any, id: string){
  if (vars.page < vars.maxPage){
    const url = `/api/game?id=${id}&page=${vars.page}&size=${vars.pageSize}`;
  
    try {
      var response = await fetch(url);
      var data = await response.json();
      console.log("Aquired  data:");
      console.log(data);
  
      // Nové proměnné
      const newVars = {
        ...vars, // Původní hodnoty
        game: data.game,
        gameReviews: [...(vars.gameReviews ?? []), ...(data.gameReviews ?? [])], // Append nových recenzí
        platforms: data.platforms,
        subGenres: data.subGenres,
        maxPage: data.totalPages,
      }

      setVars(newVars);
  
    } catch (error) {
      console.error("Chyba při načítání dat:", error);
    }

  }

}

export default game;
