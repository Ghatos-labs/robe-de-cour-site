import { useAppSelector, useAppDispatch } from '../redux/hooks.ts'; 
import { removeFromCart } from '../redux/actionTypes';
import { Product } from '../redux/actionTypes.ts'
import { Link } from "react-router-dom";
import { RootState } from "@reduxjs/toolkit/query";

const DisplayCartElements = (cart: Product[]) => {
  const elementList: JSX.Element[] = [];
  const dispatch = useAppDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  for (let i = 0; i < cart.length; i++)
  {
    elementList.push(
      <tr>
        <td>{cart[i].name}</td>
        <td>{cart[i].description}</td>
        <td>{cart[i].price}</td>
        <td><button onClick={() => handleRemove(cart[i].id)}>Supprimer l'article</button></td>
      </tr>
    )
  }

  return elementList;
}

const showCartList = () => {
  //@ts-ignore
  const cart = useAppSelector((state: RootState) => state.cart);

  if (cart.length == 0)
  {
    return(
      <>
        <p>Vous n'avez pas d'articles dans le panier.</p>
        <p>Consultez nos confections en suivant le lien ci dessous:</p>
        <Link to="/confections">Confections</Link>
      </>
    )
  }
  return(
    <table>
      <thead>
        <tr>
          <th>Article</th>
          <th>Options</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>
        {DisplayCartElements(cart)}
      </tbody>
    </table>
  );
}

function Panier() {
  return (
    <div className="content-container">
      <div>
        <h2>Panier</h2>
          {showCartList()}
      </div>
    </div>
  )
}

export default Panier