import { Link } from "react-router-dom";
import data from "./confections-data.json";

interface Props {
  btnAmount: number;
}

const GenerateRobesBtn = () => {
  const elementList: JSX.Element[] = [];
  for(let i = 1; i <= Object.keys(data.confectionPage.robes).length; i++)
  {
    elementList.push
    (
      <Link to={"/confections/" + data.confectionPage.robes[i - 1].id} className="confection-btn">
        <img src="https://placehold.co/100x150" key={i}></img>
        <h3>{data.confectionPage.robes[i - 1].name}</h3>
      </Link>
    );
  }
  return(elementList);
}

const GenerateAccessoriesBtn = () => {
  const elementList: JSX.Element[] = [];
  for(let i = 1; i <= Object.keys(data.confectionPage.accesoires).length; i++)
  {
    elementList.push
    (
      <Link to={"/confections/" + data.confectionPage.accesoires[i - 1].id} className="confection-btn">
        <img src="https://placehold.co/100x150" key={i + 100}></img>
        <h3>{data.confectionPage.accesoires[i - 1].name}</h3>
      </Link>
    );
  }
  return(elementList);
}

function Confections() {
  return(
    <div className="content-container">
      <h2>Robes</h2>
      <div className="confections-container">
        {GenerateRobesBtn()}
      </div>
      <h2>Accesoires</h2>
      <div className="confections-container">
        {GenerateAccessoriesBtn()}
      </div>
    </div>
  )
}

export default Confections