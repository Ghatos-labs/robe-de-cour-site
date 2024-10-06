import { Link, useParams } from "react-router-dom";
import data from "./confections-data.json";

const getArticleID = () => {
    const {articleID} = useParams();
    const list = data.confectionPage.robes;
    const id = list.findIndex(Object => Object.id === articleID);
    if (data.confectionPage.robes[id] == undefined)
    {
        const accesList = data.confectionPage.accesoires;
        const newId = accesList.findIndex(Object => Object.id === articleID);
        return newId;
    }
    return id;
}

const getMaterialList = () => {
    const elemID = getArticleID();
    const elementList: JSX.Element[] = [];
    var materialPropAdress = data.confectionPage.robes[elemID].options.material;
    for(let i = 1; i <= Object.keys(materialPropAdress).length; i++)
    {
        elementList.push
        (
            <option>{materialPropAdress[i - 1]}</option>
        );
    }
    return(elementList);
}

const getDoublureList = () => {
    const elemID = getArticleID();
    const elementList: JSX.Element[] = [];
    var doublurePropAdress = data.confectionPage.robes[elemID].options.doublure;
    for(let i = 1; i <= Object.keys(doublurePropAdress).length; i++)
    {
        elementList.push
        (
        <option>{doublurePropAdress[i - 1]}</option>
        );
    }
    return(elementList);
}

function Article() {
    const elemID = getArticleID();
    var elemAdress;

    if (data.confectionPage.robes[elemID].id != "eleve" || "avocat" || "auditeur" || "magistrat")
    {
        elemAdress = data.confectionPage.robes[elemID];
    }
    else
    {
        elemAdress = data.confectionPage.accesoires[elemID];
    }
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
                            <>{getMaterialList()}</>
                        </select>
                        <label htmlFor="robe-color">Doublure</label>
                        <select className="global-btn-style">
                            <>{getDoublureList()}</>
                        </select>
                        <input type="submit" value="Ajouter au panier" className="add-cart-btn global-btn-style"></input>
                    </form>
                </div>
            </div>
        </div>
    )
  }
  
  export default Article