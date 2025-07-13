import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type {GameReview} from "../customTypes.tsx";

interface GameReviewItemProps {
  gameReview: GameReview;
};

function GameReviewItem( {gameReview}: GameReviewItemProps) {
    let svg = null;

    if(gameReview.recommendation == true){
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bookmark-heart" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/></svg>;

    }
    else if (gameReview.recommendation == false){
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bookmark-x" viewBox="0 0 16 16"><path fillRule="evenodd" d="M6.146 5.146a.5.5 0 0 1 .708 0L8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 0 1 0-.708"/><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/></svg>;
    }

    return (
        <li className="list-group-item px-0">
            <h6 id="game-review-user-game-name" className="dark-green">{gameReview.user.name + " - " + gameReview.game_platform.game.name}</h6>
            <div className="d-flex justify-content-between">
                
                <div className="border-end border-secondary-subtle pe-3">
                    <div className="d-flex align-items-center gap-2">
                        <div id="game-review-num-rev">{gameReview.numerical_rev}</div>
                        <div id="game-review-num-rev-bar" className="progress" role="progressbar" aria-label="Success example">
                            <div className="progress-bar bg-success progress-bar-striped" style={{ width: (gameReview.numerical_rev * 10) + "%" }}></div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center gap-1">
                        <div>
                            <div id="game-review-platform" className="text-nowrap">{gameReview.game_platform.platform.name}</div>
                            <div id="game-review-date" className="text-nowrap">{gameReview.time.split("T")[0]}</div>
                        </div>
                        <div className="d-flex justify-content-center">
                            {svg}
                        </div>
                    </div>
                </div>

                <div id="game-review-content-box" className="ps-3 w-100">
                    <div id="game-review-content">{gameReview.written_rev}</div>
                </div>
            </div>
        </li>
    )
}

export default GameReviewItem;