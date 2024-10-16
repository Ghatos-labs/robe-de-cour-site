import { useDispatch, useSelector } from "react-redux";
import data from "./confections-data.json";

const showCartList = () => {
  //@ts-ignore
  const count = useSelector((state) => state.counter.list);
  const elementList: JSX.Element[] = [];

  for(let i = 0; i < count.length; i++)
  {
    const id = data.confectionPage.findIndex(Object => Object.id === count[i]);  
    elementList.push
    (
        <tr>
          <th key={i}>{data.confectionPage[id].name}</th>
          <th key={i}>{data.confectionPage[id].description}</th>
          <th key={i}>dabloons!</th>
        </tr>
    );            
  }
  return(elementList);
}

function Panier() {
  return (
    <div className="content-container">
      <div>
        <h2>Panier</h2>
        <table style={{border: "solid black 1px"}}>
          <tr>
            <th>Article</th>
            <th>Détails</th>
            <th>Prix</th>
          </tr>
          {showCartList()}
        </table>
      </div>
    </div>
  )
}

export default Panier