import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import type { GameReview } from '../customTypes';

import {
  Chart as ChartJS,
  registerables
} from 'chart.js';

ChartJS.register(...registerables);

interface GraphProps {
  gameReviews1?: GameReview[] | null;
  gameReviews2?: GameReview[] | null;
  gameReviews3?: GameReview[] | null;

};

function Graph({gameReviews1, gameReviews2, gameReviews3}: GraphProps) {
  const allGameReviews: GameReview[][] = [gameReviews1 ?? [], gameReviews2 ?? [], gameReviews3 ?? []];
  const [currentChart, setCurrentChart] = useState(0);

  var chartData: number[][] = [[], [], []];
  var labels: string[][] = [[], [], []];
  var chartColor = ["rgb(17, 120, 44)", "rgb(255, 0, 102)", "rgb(0, 102, 255)"];
  var platformNames = ["PC", "PlayStation 5", "Xbox Series X"];

  allGameReviews.forEach((gameReviews, index) => {
    gameReviews?.forEach(gameReview => {
      chartData[index].push(gameReview.numerical_rev);
      labels[index].push(gameReview.time.split("T")[0]);
    });
  });


  const data = {
    labels: labels[currentChart],
    datasets: [
      {
        label: 'Numerical review',
        data: chartData[currentChart],
        borderColor: chartColor[currentChart],
        backgroundColor: 'rgb(255, 255, 255)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Graph of user reviews for game' },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
      },
      x: {
        ticks: {
          autoSkip: true,   
          maxTicksLimit: 10,    
          maxRotation: 45, 
          minRotation: 45  
        }
      }
    }
  };

  // Next platform btn callback
  const nextPlatform = () => {
    setCurrentChart((currentChart + 1) % 3);
  };

  return (
    <>
      <div className="card w-100 h-100">
        <div className="card-header d-flex justify-content-between">
          <h5 className="m-0">Reviews for {allGameReviews[0][0]?.game_platform?.game?.name ?? 'Unknown'}</h5>
        </div>

        <div className="card-body">
          <div className='overflow-auto'>
            <div id='graph-canvas-wrapper' className='d-flex justify-content-center mb-3'>
                <Line width={610} height={305} key={currentChart} data={data} options={options}></Line>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <h6 id='graph-platform-name'>{platformNames[currentChart]}</h6>
          </div>
          <div className='d-flex justify-content-center'>
            <button id='graph-next-platform-btn' className='btn btn-success' onClick={nextPlatform}>Next Platform</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Graph;
