import data from "./confections-data.json";

interface Props {
  btnAmount: number;
}

const GenerateButtons = () => {
  const elementList: JSX.Element[] = [];
  for(let i = 1; i <= Object.keys(data.confectionPage.robes).length; i++)
  {
    elementList.push
    (
      <div>
        <img src="https://placehold.co/100x150" key={i}></img>
        <h3>{data.confectionPage.robes[i - 1].name}</h3>
      </div>
    );
  }
  return(elementList);
}

function Confections() {
  return(
    <div className="content-container">
      <h2>Confections</h2>
      <div id="confections-container">
        {GenerateButtons()}
      </div>
    </div>
  )
}

export default Confections