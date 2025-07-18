import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Image from './image'
import data from "./confections-data.json";

const SortItemsByCategory = () => {
  var products = data.confectionPage;
  var categories: string[] = [];

  for(let i = 0; i < products.length; i++)
  {
    if (!categories.includes(products[i].category))
    {
      categories.push(products[i].category);
    }
  }
  var sortedItems = [];

  for (let i = 0; i < categories.length; i++)
  {
    sortedItems.push(products.filter(item => item.category == categories[i]))
  }
  return sortedItems;
}

const DisplayProducts = () => {
  var sortedItems = SortItemsByCategory();
  const elementList: JSX.Element[] = [];

  for (let i = 0; i < sortedItems.length; i++)
  {
    elementList.push
    (
      <h2 key={uuidv4()}>{sortedItems[i][0].category}</h2>
    )
    const categoryContent: JSX.Element[] = [];
    for (let j = 0; j < sortedItems[i].length; j++)
    {
      categoryContent.push
      (
        <Link to={"/confections/" + sortedItems[i][j].id} className="confection-btn btn-underline-effect" key={uuidv4()}>
          <Image 
            source={"./img/" + sortedItems[i][j].id + "-img.jpg"}
            containerClass={"confection-btn-img-container"}
          />
          <h3 className="confection-btn-title">{sortedItems[i][j].name}</h3>
          <p>À partir de {Math.min(...sortedItems[i][j].price)}€</p>
        </Link>
      )
      const imgContainerAdress = document.querySelector(".confection-btn-img-container");
      imgContainerAdress?.getAttribute("width")
    }
    elementList.push
    (
      <div className="confections-container" key={uuidv4()}>
        {categoryContent}
      </div>
    )
  }

  return(
    <div className="content-container">
      <div>
        {elementList}        
      </div>
    </div>
  )
}

function Confections() {
  return(
    <div className="content-container">
      {DisplayProducts()}
    </div>
  )
}

export default Confections