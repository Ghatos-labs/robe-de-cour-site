import data from "./confections-data.json";

type Props = {
  btnAmount: number;
}
function GenerateButtons(amount: number)
{
  let containerDiv = document.createElement("div");
  for (let i = 1; i <= amount; i++)
  {
    let img = document.createElement("img");
    img.src = "https://placehold.co/100x150"

    let title = document.createElement("h3");
    title.textContent = "text " + i

    containerDiv.appendChild(img);
    containerDiv.appendChild(title);
  }
  return containerDiv;
}

function Confections(props: Props) {
  let confectionsPage = 
  `<div className="content-container">
    <div>
      <h2>Confections</h2>`
      + GenerateButtons(props.btnAmount); +
    `</div>
  </div>`;
  
  return confectionsPage;
    // <div className="content-container">
    //   <div>
    //     <h2>Confections</h2>
    //     GenerateButtons(props: Props)
    //     <div>
    //       <img src="https://placehold.co/100x150"></img>
    //       <h3>Robe 1</h3>
    //     </div>
    //     <div>
    //       <img src="https://placehold.co/100x150"></img>
    //       <h3>Robe 2</h3>
    //     </div>
    //   </div>
    // </div>
}

export default Confections