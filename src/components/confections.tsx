import { Link } from "react-router-dom";
import data from "./confections-data.json";

const GenerateConfectionBtn = (isElemRobe: boolean) => {
  const elementList: JSX.Element[] = [];
  for(let i = 0; i < data.confectionPage.length; i++)
  {
    if (data.confectionPage[i].isRobe == isElemRobe)
    {
      elementList.push
      (
        <Link to={"/confections/" + data.confectionPage[i].id} className="confection-btn">
          <img src="https://placehold.co/100x150" key={i}></img>
          <h3>{data.confectionPage[i].name}</h3>
        </Link>
      );      
    }
  }
  return(elementList);
}

function Confections() {
  return(
    <div className="content-container">
      <h2>Robes</h2>
      <div className="confections-container">
        {GenerateConfectionBtn(true)}
      </div>
      <h2>Accesoires</h2>
      <div className="confections-container">
        {GenerateConfectionBtn(false)}
      </div>
    </div>
  )
}

export default Confections