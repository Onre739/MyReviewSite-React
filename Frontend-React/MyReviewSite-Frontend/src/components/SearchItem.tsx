import { Link } from "react-router-dom";
import type {Game} from "../customTypes.tsx";

interface SearchItemProps {
  game: Game;
};

function SearchItem({game}: SearchItemProps) {

    return (
        <>
          <li className="list-group-item px-0">
            <div className="row">
                <div className="col-12 col-lg-4 d-flex gap-2">
                    <Link to={"/game?id=" + game.id}>
                        <img id="search-item-img" className="hover-inc" src={game.img_path}></img>
                    </Link>
                    <div className="">
                        <Link to={"/game?id=" + game.id} className="hover-green">
                            <h6 id="search-item-game">{game.name}</h6>
                        </Link>
                        <div id="search-item-developer">{game.developer.name}</div>
                        <div id="search-item-date">{game.release_date}</div>
                    </div>
                </div>

                <div className="col-0 col-lg-1"></div>
                <div id="search-item-description-box" className="col-12 col-lg-7 d-flex align-items-center">
                    <div id="search-item-description">{game.description}</div>
                </div>
            </div>
          </li>
        </>
    )

}


export default SearchItem;