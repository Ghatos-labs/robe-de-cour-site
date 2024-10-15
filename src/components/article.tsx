import { Link, useParams } from "react-router-dom";
import data from "./confections-data.json";

import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, push } from "./cart";

const getArticleID = () => {
    const {articleID} = useParams();
    const list = data.confectionPage;
    const id = list.findIndex(Object => Object.id === articleID);
    return id;
}

const getChoiceList = (choice: string) => {
    const elemID = getArticleID();
    const elementList: JSX.Element[] = [];

    var materialPropAdress;

    if (choice == "Tissu")
    {
        materialPropAdress = data.confectionPage[elemID].options?.Tissu;
    }
    if (choice == "Doublure")
    {
        materialPropAdress = data.confectionPage[elemID].options?.Doublure;
    }
    if (materialPropAdress == undefined)
    {
        return
    }
    
    for(let i = 0; i < Object.keys(materialPropAdress).length; i++)
    {
        elementList.push
        (
            <option key={i}>{materialPropAdress[i]}</option>
        );            
    }
    return(
        <>
            <label>{choice}</label>
            <select>
                {elementList}
            </select>        
        </>
    );
}

// function addToCart () {
//     //@ts-ignore
//     const count = useSelector((state) => state.counter.count);
//     const dispatch = useDispatch();

//     const elemID = getArticleID();
//     const elemAdress = data.confectionPage[elemID];
    
//     () => dispatch(push(elemAdress.id))
// }

function Article() {
    //@ts-ignore
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    const elemID = getArticleID();
    const elemAdress = data.confectionPage[elemID];

    return (
        <div className="content-container">
            <div id="article-container">
                <Link to="/confections" className="return-btn global-btn-style">Retour</Link>
                <h1>{elemAdress.name}</h1>
                <div>
                    <img src={"/img/" + elemAdress.id + "-robe-img.jpg"}></img>
                    <p id="article-description">{elemAdress.description}</p>
                    <form id="article-form">
                        {getChoiceList("Tissu")}
                        {getChoiceList("Doublure")}
                        {/* <input type="submit" value="Ajouter au panier" className="add-cart-btn global-btn-style" onClick={addToCart}></input> */}
                    </form>
                    <button onClick={() => dispatch(push(elemAdress.id))}>go to panier</button>
                </div>
            </div>
        </div>
    )
  }
  
  export default Article