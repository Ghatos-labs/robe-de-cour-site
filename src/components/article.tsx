import { Link, useNavigate, useParams } from "react-router-dom";
import data from "./confections-data.json";
import { useAppDispatch } from '../redux/hooks';
import { addToCart } from '../redux/actionTypes';
import { Product } from '../redux/actionTypes';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import Image from './image';

function textField(text: string, property: string, key: string) {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return(
        <div key={key}>
            <label htmlFor={property}>{text + " (en cm)"}</label>
            <br></br>
            <input
                type="number"
                min="0"
                id={property}
                className="form-text-style"
                required
                value={value}
                onChange={handleChange}
            ></input>
        </div>
    )
}

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
        const optionValue = propsList[i] + ": " + (document.getElementById(propsList[i]) as HTMLInputElement | HTMLSelectElement).value;
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

const DisplayOptions = (setRobePrice: any, setLiningID: any) => {
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
    
            const updateDisplay = () => {
                const dropdownList = prop;
                const listElement = document.getElementById(dropdownList) as HTMLSelectElement;
                const listElementIndex = listElement.selectedIndex;
                // setLiningID(listElementIndex);
                if (dropdownList.toLowerCase().includes("doublure"))
                {
                    setLiningID(listElementIndex);
                }
                setRobePrice(ApplyPrice(elemID));
            }

            for (let j = 0; j < Object.keys(materialProp).length; j++)
            {
                var priceText;
                if (i == 0)
                {
                    priceText = " (" + data.confectionPage[elemID].price[j] + "€)";
                }
                else if (i == 1)
                {
                    //@ts-ignore
                    priceText = " (" + data.confectionPage[elemID].lining_price[j] + "€)";
                    if (priceText == undefined)
                    {
                        priceText == "";
                    }
                }
                if (j == 0)
                {
                    optionsList.push(
                        <>
                            <option defaultValue={"selected"} key={i + j + "-child"}>
                                <p className="option-name">{materialProp[j]}</p>
                                {priceText}
                            </option>
                        </>
                    )
                }
                else
                {
                    optionsList.push(
                        <option key={i + j + "-child"}>
                            <p className="option-name">{materialProp[j]}</p>
                            {priceText}
                        </option>
                    )
                }
            }
            
            elementList.push(
            <div key={i + "-dropdown-parent"}>
                <label htmlFor={prop}>{finalText}</label>
                <br></br>
                <select id={prop} className="form-dropdown-style" onChange={() => updateDisplay()} required>
                    {optionsList}
                </select>
            </div>
            );
        }
        else if (propType === "number")
        {
            elementList.push(
                textField(finalText, prop, i.toString())
            );
        }
    }

    return(elementList);
}

function Article() {
    const tva = 1.2;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const elemID = getArticleID();
    const elemAdress = data.confectionPage[elemID];
    const [robePrice, setRobePrice] = useState(elemAdress.price[0]);
    const [liningID, setLiningID] = useState(0);

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    };

    const addItemToCart = () => {
        const cartElemID = uuidv4();
        const webStorageElem: Product = {
            id: cartElemID,
            name: elemAdress.name,
            description: elemAdress.description,
            price: ApplyPrice(elemID),
            options: ApplyOptions(elemID)
        }
        localStorage.setItem(cartElemID, JSON.stringify(webStorageElem))
        handleAddToCart(webStorageElem);
    }

    async function confirmationBox() {
        const confirmContainer = document.getElementById("confirmation-box-container");
        const confirmButton = document.getElementById("confirmation-button");

        confirmContainer?.setAttribute("style", "visibility: visible;");
        return new Promise<void>((resolve) => {
            //@ts-ignore
            confirmButton.onclick = () => {
                resolve();
            }
        })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        addItemToCart();
        await confirmationBox();
        navigate('/confections');
    }

    var liningImg = <Image containerClass="article-img" source={"/robe-de-cour-site/img/robe-lining/lining-" + liningID + "-img.jpg"}/>

    if (elemAdress.category == "Accessoires")
    {
        liningImg = <div></div>
    }

    return (
        <div className="content-container">
            <div id="article-container">
                <div id="confirmation-box-container">
                    <div id="confirmation-box">
                        <p>Votre article a été ajoutée au panier!</p>
                        <button id="confirmation-button">Continuer</button>
                    </div>
                </div>
                <Link to="/confections" className="btn-underline-effect">Retour</Link>
                <h1>{elemAdress.name}</h1>
                <div id="sub-article-container">
                    <div className="sub-article-pannel article-img-container">
                        <img className="article-img" src={"/robe-de-cour-site/img/" + elemAdress.id + "-img.jpg"}></img>
                        {liningImg}
                    </div>
                    <div className="sub-article-pannel">
                        <form id="article-form" onSubmit={handleSubmit}>
                            <p id="article-description">{data.articlePage.robeDescription} {Math.min(...elemAdress.price)}€.</p>
                            {/* <p>
                                {
                                    //@ts-ignore
                                    data.articlePage.materialDescription?.[elemAdress.options.Type?.[liningID]]
                                }
                            </p> */}
                            {DisplayOptions(setRobePrice, setLiningID)}
                            <h3 id="TTC-price">Prix TTC: {robePrice}€</h3>
                            <h3 id="HT-price">Prix HT: {((robePrice)/ tva).toFixed(2)}€</h3>
                            <button type="submit">Ajouter au panier</button>
                        </form>                        
                    </div>
                </div>
            </div>
        </div>
    )
  }
  
  export default Article