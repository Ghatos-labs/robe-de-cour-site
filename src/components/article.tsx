import { Link, useParams } from "react-router-dom";
import data from "./confections-data.json";

const getArticleID = () => {
    const {articleID} = useParams();
    const list = data.confectionPage;
    const id = list.findIndex(Object => Object.id === articleID);
    return id;
}

// const getMaterialList = () => {
//     const elemID = getArticleID();
//     const elementList: JSX.Element[] = [];
//     var materialPropAdress = data.confectionPage[elemID].options.material;
//     for(let i = 1; i <= Object.keys(materialPropAdress).length; i++)
//     {
//         elementList.push
//         (
//             <option>{materialPropAdress[i - 1]}</option>
//         );
//     }
//     return(elementList);
// }

// const getDoublureList = () => {
//     const elemID = getArticleID();
//     const elementList: JSX.Element[] = [];
//     var doublurePropAdress = data.confectionPage[elemID].options.doublure;
//     for(let i = 1; i <= Object.keys(doublurePropAdress).length; i++)
//     {
//         elementList.push
//         (
//         <option>{doublurePropAdress[i - 1]}</option>
//         );
//     }
//     return(elementList);
// }

function Article() {
    const elemID = getArticleID();
    const elemAdress = data.confectionPage[elemID]

    return (
        <div className="content-container">
            <div id="article-container">
                <Link to="/confections" className="return-btn global-btn-style">Retour</Link>
                <h1>{elemAdress.name}</h1>
                <div>
                    <img src={"/public/img/" + elemAdress.id + "-robe-img.jpg"}></img>
                    <p id="article-description">{elemAdress.description}</p>
                    <form id="article-form">
                        <label htmlFor="robe-color">Couleur</label>
                        <select className="global-btn-style">
                            {/* <>{getMaterialList()}</> */}
                        </select>
                        <label htmlFor="robe-color">Doublure</label>
                        <select className="global-btn-style">
                            {/* <>{getDoublureList()}</> */}
                        </select>
                        <input type="submit" value="Ajouter au panier" className="add-cart-btn global-btn-style"></input>
                    </form>
                </div>
            </div>
        </div>
    )
  }
  
  export default Article