import { Link, useParams } from "react-router-dom";
import data from "./confections-data.json";

const getArticleID = () => {
    const {articleID} = useParams();
    const robeList = data.confectionPage.robes;
    const id = robeList.findIndex(Object => Object.id === articleID);
    return id;
}

function Article() {
    const articleID = getArticleID();
    return (
        <div className="content-container">
            <div id="article-container">
                <Link to="/confections" className="return-btn global-btn-style" >Retour</Link>
                <h1>{data.confectionPage.robes[articleID].name}</h1>
                <div>
                    <img src="https://placehold.co/150x200"></img>
                    <p id="article-description">{data.confectionPage.robes[articleID].description}</p>
                    <a className="add-cart-btn global-btn-style">Ajouter au panier</a>
                </div>
            </div>
        </div>
    )
  }
  
  export default Article