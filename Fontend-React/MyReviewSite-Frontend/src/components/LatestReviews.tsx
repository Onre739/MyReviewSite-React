import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type {VarsState} from "../customTypes.tsx";
import LatestReviewItem from "./LatestReviewItem.tsx";

interface LatestReviewsProps {
  vars: VarsState;
};

function LatestReviews( {vars} : LatestReviewsProps) {

    if (!vars.gameReviews || vars.gameReviews.length === 0) {
    return <div>Načítání Recenzí...</div>;
  }

    return (
        <ul>
            {vars.gameReviews.map((gameReview: any) => {
                <LatestReviewItem></LatestReviewItem>
            })}
        </ul>
    )
}

export default LatestReviews;