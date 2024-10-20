import { Link, useParams } from "react-router-dom";
import data from "./confections-data.json";
import { useAppDispatch } from '../redux/hooks';
import { addToCart } from '../redux/actionTypes';
import { Product } from '../redux/actionTypes';
import { v4 as uuidv4 } from 'uuid';

const getArticleID = () => {
    const {articleID} = useParams();
    const list = data.confectionPage;
    const id = list.findIndex(Object => Object.id === articleID);
    return id;
}

const DisplayOptions = () => {
    const elemID = getArticleID();
    const elementList: JSX.Element[] = [];
    // const optionsList: JSX.Element[] = [];
    const optionsData = data.confectionPage[elemID].options;
    const propsList = Object.keys(optionsData);

    for (let i = 0; i < propsList.length ; i++ )
    {
        const prop = propsList[i];  
        const propType = typeof optionsData[prop as keyof typeof optionsData];
        const finalText = prop.replace(/_/g, " ");

        if (propType === "object")
        {
            const optionsList: JSX.Element[] = [];
            const materialProp = optionsData[propsList[i] as keyof typeof optionsData] as string[];

            for (let j = 0; j < Object.keys(materialProp).length; j++)
            {
                optionsList.push(
                    <option key={j} value={prop}>{materialProp[j]}</option>
                )
            }
            
            elementList.push(
            <>
                <label htmlFor={prop}>{finalText}</label>
                <select>
                    {optionsList}
                </select>
            </>
            );
        }
        else if (propType === "number")
        {
            elementList.push(
                <>
                    <label key={i * 2 - 1} htmlFor={prop}>{finalText}</label>
                    <input key={i * 2} type="text" name={prop}></input>
                </>
            );            
        }
    }

    return(elementList);
}

function Article() {
    //@ts-ignore
    //const count = useSelector((state) => state.counter.count);
    const dispatch = useAppDispatch();
    const elemID = getArticleID();
    const elemAdress = data.confectionPage[elemID];

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="content-container">
            <div id="article-container">
                <Link to="/confections" className="return-btn global-btn-style">Retour</Link>
                <h1>{elemAdress.name}</h1>
                <div>
                    <img src={"/img/" + elemAdress.id + "-robe-img.jpg"}></img>
                    <p id="article-description">{elemAdress.description}</p>
                    <form id="article-form">
                        {DisplayOptions()}
                    </form>
                    <button onClick={() => handleAddToCart({
                        id: uuidv4(),
                        name: elemAdress.name,
                        description: elemAdress.description,
                        price: elemAdress.price[0],
                        options: ""
                    })}>ajouter au panier</button>
                </div>
            </div>
        </div>
    )
  }
  
  export default Article