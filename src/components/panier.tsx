import { useAppSelector, useAppDispatch } from '../redux/hooks.ts'; 
import { removeFromCart } from '../redux/actionTypes';
import { Product } from '../redux/actionTypes.ts'
import { Link } from "react-router-dom";
import { RootState } from "@reduxjs/toolkit/query";
import data from "./confections-data.json";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const GeneratePDFTable = (cart: Product[]) => {
  const elementList: JSX.Element[] = [];

  for (let i = 0; i < cart.length ; i++)
  {
    const optionList: JSX.Element[] = [];
    for (let j = 0; j < cart[i].options.length ; j++)
    {
      optionList.push(
        <p>{cart[i].options[j]}<br></br></p>
      )
    }
    elementList.push(
        <tr>
          <th>{cart[i].name}</th>
          <th>{optionList}</th>
          <th>{cart[i].price}</th>
        </tr>        
    )
  }

  return (
    <table id="PDF-table" style={{display: "none"}}>
      <thead>
        <tr>Produit</tr>
        <tr>Options</tr>
        <tr>Prix</tr>
      </thead>
      <tbody>
        {elementList}
      </tbody>
    </table>
  )
}
const GeneratePDF = (cart: Product[]) => {
  const invoice = new jsPDF();

  autoTable(invoice, {
    head: [
      ['Facture Robe de Cour'],
    ],
  })
  autoTable(invoice, {
    body: [
      ['Nom prénom', 'Nom prénom 2'],
      ['Adresse', 'Adresse'],
      ['Contact', 'Contact'],
    ],
  })
  // autoTable(invoice, {
  //   head: [['Produit', 'Options', 'Prix']],
  //   startY: 50,
  //   styles: {
  //     fontSize: 15,
  //     cellWidth: 'wrap'
  //   },
  //   body: [
  //     [cart[0].name, "lorem ipsum", cart[0].price],
  //   ],
  // })
  autoTable(invoice, {
    head: [['LOREM', 'IPSUM', 'DOLOR']],
    html: '#PDF-table'
  })

  invoice.save("Facture-Robe-de-Cour.pdf");

  return 0
}

const GenerateOptions = (cart: Product[], id: number) => {
  const elementList: JSX.Element[] = [];

  for (let i = 0; i < cart[id].options.length ; i++)
  {
    const option = Object.keys(data.confectionPage[id].options);
    const finalText = option[i].replace(/_/g, " ");

    elementList.push(
      <p>{finalText + ": " + cart[id].options[i]}</p>
    )
  }
  return (elementList)
}

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
        <td>{GenerateOptions(cart, i)}</td>
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
    <>
      {GeneratePDFTable(cart)}
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

      <button onClick={() => GeneratePDF(cart)}>Générer le PDF</button>
    </>
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