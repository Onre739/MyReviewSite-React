import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import SearchItem from "../components/SearchItem.tsx";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type {SearchVarsType, setNewVarsType, Game} from "../customTypes.tsx";

function search() {
  var location =  useLocation();
  var params = new URLSearchParams(location.search);
  const string = params.get("string") ?? "";

  var vars_obj: SearchVarsType = {
    games: [],
    page: 0,
  
    maxPage: 1,
    pageSize: 10,
  };
  
  // Nastavení objektu jako State
  const [vars, setVars] = useState<SearchVarsType>(vars_obj);
  
  // Zisk dat z API, spustí se 1 při spuštění
  useEffect(() => {
    getData(vars, setVars, string);
  }, []);
  
  // Pokud dojde ke změně parametru URL pro vyhledávání
  useEffect(() => {
    const newVars = {
      ...vars,
      games: [],
      page: 0,
      maxPage: 1,
    };

    getData(newVars, setVars, string);

  }, [string]);
  
  // Viditelnost tlačítka na load more dat
  const checkBtnVisibility = vars.page < (vars.maxPage - 1) && (vars.games?.length ?? 0) > 0;
  
  // Pomocná funkce pro onclick na btn load more
  const loadMore = () => {
    const newVars = {
      ...vars,
      page: vars.page + 1,
    };

    getData(newVars, setVars, string);
  };

  // Návrat
  return (
    <>
      <div className="card main-card mt-3">
        <Header></Header>

        <div className="card-body">

          <div className="card w-100">
            <h5 className="card-header">Search</h5>

            <div className="card-body">
              <ul className="list-group list-group-flush">
                {vars.games?.map((game: Game) => {
                  return <SearchItem game={game}></SearchItem>
                })}
              </ul>
              <div id="search-nothing-div" className="alert alert-secondary d-none" role="alert">Nothing found :/</div>
              <div className="d-flex justify-content-center">
                <button id="search-more-btn" onClick={loadMore} className={checkBtnVisibility ? "btn btn-success btn-sm d-block" : "btn btn-success btn-sm d-none"}>Load More</button>
              </div>
            </div>

          </div>

        </div>

        <Footer></Footer>
      </div>
    </>
  );
}

async function getData(vars: SearchVarsType, setVars: any, string: string){
  if (vars.page < vars.maxPage){
    const url = `/api/search?string=${string}&page=${vars.page}&size=${vars.pageSize}`;
  
    try {
      var response = await fetch(url);
      var data = await response.json();
      console.log("Aquired  data:");
      console.log(data);
  
      // Nové proměnné
      const newVars = {
        ...vars, // Původní hodnoty
        games: [...(vars.games ?? []), ...(data.games ?? [])], // Append nových her
        maxPage: data.totalPages,
      }
  
      setVars(newVars);
  
    } catch (error) {
      console.error("Chyba při načítání dat:", error);
    }
  }

}

export default search;
