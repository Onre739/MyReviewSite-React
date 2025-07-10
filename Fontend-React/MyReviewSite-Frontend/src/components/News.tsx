import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type {VarsState, setNewVarsType} from "../customTypes.tsx";

interface NewsProps {
  vars: VarsState;
  setCurrentNewIndex: (index: number) => void;
};

function News({ vars, setCurrentNewIndex }: NewsProps) {
  if (!vars.news || vars.news.length === 0) {
    return <div>Načítání novinek...</div>;
  }

  let actualNew = vars.news[vars.currentNewIndex];

  const handleLeftClick = () => incBtn(vars, setCurrentNewIndex);
  const handleRightClick = () => decBtn(vars, setCurrentNewIndex);

  return (
    <div className="card w-100 news-card">
      <div className="card-header d-flex justify-content-between">
        <h5 className="m-0">News</h5>
        <div>{actualNew.date}</div>
        <div className="d-flex align-items-center">
          <button onClick={handleLeftClick} className="btn btn-success btn-smallest me-1">{"<"}</button>
          <button onClick={handleRightClick} className="btn btn-success btn-smallest">{">"}</button>
        </div>
      </div>

      <div className="card-body">
        <Link to="/game" className="text-decoration-none">
          <h6 id="news-title" className="hover-green">{actualNew.title}</h6>
        </Link>

        <div className="d-flex justify-content-center mb-2">
          <img id="news-img" src={actualNew.img_path} alt="Obrázek novinky" />
        </div>

        <div id="news-content">{actualNew.text}</div>
      </div>
    </div>
  );
}

function incBtn(vars: VarsState, setCurrentNewIndex: (index: number) => void){
  setCurrentNewIndex(
    (vars.currentNewIndex + 1) % 3
  )
}

function decBtn(vars: VarsState, setCurrentNewIndex: (index: number) => void){
  setCurrentNewIndex(
    (vars.currentNewIndex - 1) < 0 ? 2 : vars.currentNewIndex - 1
  )
}


export default News;
