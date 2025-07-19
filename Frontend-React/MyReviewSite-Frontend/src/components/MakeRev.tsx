import type {Platform, Game} from "../customTypes.tsx";
import { useNavigate } from "react-router-dom";

interface MakeRevProps {
  platforms: Platform[];
  auth: boolean;
  userDetails: any;
  game: Game | null;
}

function make_rev({platforms, auth, userDetails, game}: MakeRevProps) {
  const num_values = [1,2,3,4,5,6,7,8,9,10];
  const navigate = useNavigate();

  const sendReviewCall = () => {
    sendReview(auth, userDetails, game, navigate);
  };

  return (
    <>
      <div className="row mb-2">

        <h6 className="col-12 col-lg-2 dark-green">Numerical review:</h6>
        <div className="col-12 col-lg-2">
          <select className="form-select" id="make-rev-num">
            <option value="0" selected={undefined}>0</option>
            {num_values.map(num => {
              return <option key={num} value={num}>{num}</option>
            })}
          </select>
        </div>

      </div>
      
      <div className="row mb-2">
        <h6 className="col-12 col-lg-2 dark-green">Platform:</h6>
        <div className="col-12 col-lg-3">
          <select className="form-select" id="make-rev-platform">
            {platforms.map(platform => {
              return <option key={platform.id} value={platform.name}>{platform.name}</option>
            })}
          </select>
        </div>

        <div className="col-0 col-lg-1"></div>

        <h6 className="col-12 col-lg-2 dark-green">Recommendation:</h6>
        <div className="col-12 col-lg-4">
          <div className="form-check">
              <input name="form-radio" className="form-check-input" type="radio" id="make-rev-radio-null" defaultChecked/>
              <label className="form-check-label" htmlFor="make-rev-radio-null">Nothing</label>
          </div>
          <div className="form-check">
              <input name="form-radio" className="form-check-input" type="radio" id="make-rev-radio-rec"/>
              <label className="form-check-label" htmlFor="make-rev-radio-rec">Recommend</label>
          </div>
          <div className="form-check">
              <input name="form-radio" className="form-check-input" type="radio" id="make-rev-radio-not"/>
              <label className="form-check-label" htmlFor="make-rev-radio-not">Not recommend</label>
            </div>
        </div>
        
      </div>
      
      <div className="row mb-2">
        <h6 className="dark-green">Written review:</h6>
      </div>
      <div className="row mb-3">
        <textarea id="make-rev-text" className="form-control" rows={4}></textarea>
      </div>
      <div className="row mb-2">
        <div className="col-6 col-lg-3">
          <button id="make-rev-send" className="btn btn-success" onClick={sendReviewCall}>Make review</button>
        </div>
        <div id="make-rev-error" className="col-6 col-lg-9 center center d-none"></div>
      </div>
    </>
  );
}

async function sendReview(auth: boolean, userDetails: any, game: Game | null, navigate: any){
    // Kontrola přihlášenosti
    if (!auth) {
        return;
    }

    const numInput = document.getElementById('make-rev-num') as HTMLSelectElement | null;
    const platInput = document.getElementById('make-rev-platform') as HTMLSelectElement | null;
    const textInput = document.getElementById('make-rev-text') as HTMLTextAreaElement | null;

    var rec = null;
    if (document.getElementById("make-rev-radio-rec")?.hasAttribute("checked")) rec = 1;
    if (document.getElementById("make-rev-radio-not")?.hasAttribute("checked")) rec = 0;

    const data = {
        user_mail: userDetails.email,
        numerical_rev: numInput?.value,
        written_rev: textInput?.value,
        recommendation: rec,
        time: new Date().toISOString(),
        game_id: game?.id,
        platform_name: platInput?.value
    };

    console.log("Sending: ", data);

    const response = await fetch('/api/rev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    console.log(response);
    
    if (response.ok) {
        window.alert("✅ Succesfully created");
        console.log("✅ Succesfully created");
        navigate("/");
        
    } 
    else {
        window.alert("❌ Something went wrong");
        console.log("❌ Something went wrong");

        navigate("/"); 
    }
}

export default make_rev;
