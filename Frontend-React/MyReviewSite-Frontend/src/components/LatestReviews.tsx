import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type {HomeVarsType, GameReview} from "../customTypes.tsx";
import LatestReviewItem from "./LatestReviewItem.tsx";

interface LatestReviewsProps {
  vars: HomeVarsType;
};

function LatestReviews( {vars} : LatestReviewsProps) {

    if (!vars.gameReviews || vars.gameReviews.length === 0) {
    return <div>Načítání Recenzí...</div>;
  }

    return (
        <div className="card w-100">
            <h5 className="card-header">Latest Review</h5>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    {vars.gameReviews.map((gameReview: GameReview) => {
                        return <LatestReviewItem key={gameReview.id} gameReview={gameReview}></LatestReviewItem>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default LatestReviews;