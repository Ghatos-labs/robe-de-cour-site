import { Link } from "react-router-dom";
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
      <h2>{sortedItems[i][0].category}</h2>
    )
    const categoryContent: JSX.Element[] = [];
    for (let j = 0; j < sortedItems[i].length; j++)
    {
      categoryContent.push
      (
        <Link to={"/confections/" + sortedItems[i][j].id} className="confection-btn">
          <img src="https://placehold.co/100x150" key={j}></img>
          <h3>{sortedItems[i][j].name}</h3>
        </Link>
      )
    }
    elementList.push
    (
      <div className="confections-container">
        {categoryContent}
      </div>
    )
  }

  return(
    <div className="content-container">
      {elementList}
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