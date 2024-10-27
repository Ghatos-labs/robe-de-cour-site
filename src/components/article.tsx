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

const ApplyOptions = (elemID: number) => {
    const optionsData = data.confectionPage[elemID].options;
    const propsList = Object.keys(optionsData);
    const optionList: any[] = [];

    for (let i = 0; i < propsList.length; i++)
    {
        const optionValue = (document.getElementById(propsList[i]) as HTMLInputElement | HTMLSelectElement)?.value
        optionList.push(optionValue);
    }
    return (optionList);
}

const DisplayOptions = () => {
    const elementList: JSX.Element[] = [];
    const elemID = getArticleID();
    const optionsData = data.confectionPage[elemID].options;
    const propsList = Object.keys(optionsData);

    for (let i = 0; i < propsList.length; i++ )
    {
        const prop = propsList[i];  
        const propType = typeof optionsData[prop as keyof typeof optionsData];
        const finalText = prop.replace(/_/g, " ");
        const materialProp = optionsData[propsList[i] as keyof typeof optionsData] as string[];

        if (propType === "object")
        {
            const optionsList: JSX.Element[] = [];
            for (let j = 0; j < Object.keys(materialProp).length; j++)
            {
                if (j == 0)
                {
                    optionsList.push(
                        <option defaultValue={"selected"}>{materialProp[j]}</option>
                    )
                }
                else
                {
                    optionsList.push(
                        <option>{materialProp[j]}</option>
                    )
                }
            }
            
            elementList.push(
            <>
                <label htmlFor={prop}>{finalText}</label>
                <select id={prop}>
                    {optionsList}
                </select>
            </>
            );
        }
        else if (propType === "number")
        {
            elementList.push(
                <>
                    <label htmlFor={prop}>{finalText}</label>
                    <input type="text" name={prop} id={prop}></input>
                </>
            );
        }
    }

    return(elementList);
}

function Article() {
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
                        options: ApplyOptions(elemID)
                    })}>ajouter au panier</button>
                </div>
            </div>
        </div>
    )
  }
  
  export default Article