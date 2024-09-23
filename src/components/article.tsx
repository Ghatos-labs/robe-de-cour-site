import data from "./confections-data.json";

// const generateOptions = () => {
//     const elementList: JSX.Element[] = [];
//     for(let i = 1; i <= Object.keys(data.confectionPage.robes).length; i++)
//     {
//       elementList.push
//       (
//         <Link to={"/confections/" + data.confectionPage.accesoires[i - 1].id} className="confection-btn">
//           <img src="https://placehold.co/100x150" key={i}></img>
//           <h3>{data.confectionPage.accesoires[i - 1].name}</h3>
//         </Link>
//       );
//     }
//     return(elementList);
// }

function Article() {
    return (
        <div className="content-container">
            <div id="article-container">
                <h1>Article</h1>
                <div>
                    <img src="https://placehold.co/150x200"></img>
                    <p id="article-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                    <a id="add-cart-btn">Ajouter au panier</a>
                </div>
            </div>
        </div>
    )
  }
  
  export default Article