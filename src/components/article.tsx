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

const ApplyPrice = (elemID: number) => {
    const optionsData = data.confectionPage[elemID];
    const propsList = Object.keys(optionsData.options);

    const getElementId = (id: number) => {
        return ((document.getElementById(propsList[id]) as any)?.selectedIndex)
    }

    const tissuID = getElementId(0)
    const doublureID = getElementId(1)

    const fixTissuValue = () => {
        const value = optionsData.price?.[tissuID]
        if (value == undefined)
        {
            return optionsData.price?.[0]
        }
        else
        {
            return value
        }
    }
    const fixDoublureValue = () => {
        const value = optionsData.lining_price?.[doublureID]
        if (value == undefined)
        {
            return 0
        }
        else
        {
            return value
        }
    }


    const finalPrice = fixTissuValue() + fixDoublureValue()
    return (finalPrice);
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
                        <option defaultValue={"selected"} key={uuidv4()}>{materialProp[j]}</option>
                    )
                }
                else
                {
                    optionsList.push(
                        <option key={uuidv4()}>{materialProp[j]}</option>
                    )
                }
            }
            
            elementList.push(
            <div key={uuidv4()}>
                <label htmlFor={prop}>{finalText}</label>
                <br></br>
                <select id={prop} className="form-dropdown-style" required>
                    {optionsList}
                </select>
            </div>
            );
        }
        else if (propType === "number")
        {
            elementList.push(
                <div key={uuidv4()}>
                    <label htmlFor={prop}>{finalText + " (en cm)"}</label>
                    <br></br>
                    <input type="number" min="0" id={prop} className="form-text-style" required></input>
                </div>
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

    const addItemToCart = () => handleAddToCart({
        id: uuidv4(),
        name: elemAdress.name,
        description: elemAdress.description,
        price: ApplyPrice(elemID),
        options: ApplyOptions(elemID)
    })

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addItemToCart();
    };

    return (
        <div className="content-container">
            <div id="article-container">
                <Link to="/confections" className="btn-underline-effect">Retour</Link>
                <h1>{elemAdress.name}</h1>
                <div id="sub-article-container">
                    <div className="sub-article-pannel">
                        <img className="article-img" src={"/img/" + elemAdress.id + "-img.jpg"}></img>
                    </div>
                    <div className="sub-article-pannel">
                        <form id="article-form" onSubmit={handleSubmit}>
                        <p id="article-description">{elemAdress.description}</p>   
                            {DisplayOptions()}
                            <button type="submit">ajouter au panier</button>
                        </form>                        
                    </div>
                </div>
            </div>
        </div>
    )
  }
  
  export default Article