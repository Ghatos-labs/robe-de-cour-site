import { useAppSelector, useAppDispatch } from '../redux/hooks.ts'; 
import { removeFromCart } from '../redux/actionTypes';
import { Product } from '../redux/actionTypes.ts'
import { Link } from "react-router-dom";
import { RootState } from "@reduxjs/toolkit/query";
import { v4 as uuidv4 } from 'uuid';
import data from "./confections-data.json";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const tva = 1.2;

const GeneratePDFTable = (cart: Product[]) => {
  const elementList: JSX.Element[] = [];

  for (let i = 0; i < cart.length ; i++)
  {
    const optionList: JSX.Element[] = [];
    const option = Object.keys(data.confectionPage[data.confectionPage.findIndex((Object) => Object.name == cart[i].name)].options);
    var unit = ""
    for (let j = 0; j < cart[i].options.length ; j++)
    {
      const finalText = option[j]?.replace(/_/g, " ");

      if (j >= 2)
      {
        unit = "cm"
      }
      if (j == 0)
      {
        optionList.push(
          <p key={uuidv4()}>{finalText + ": " + cart[i].options[j] + unit}</p>
        )
      }
      else
      {
        optionList.push(
          <p key={uuidv4()}><br></br>{finalText + ": " + cart[i].options[j] + unit}</p>
        )        
      }
    }
    elementList.push(
        <tr key={uuidv4()}>
          <th>{cart[i].name}</th>
          <th>{optionList}</th>
          <th>{"TTC: " + cart[i].price + "€"}<br></br>{"HT: " + (cart[i].price / tva).toFixed(2) + "€"}</th>
        </tr>        
    )
  }

  return (
    <>
      <table id="PDF-table" style={{display: "none"}}>
        <tr>
          <td>Produit</td>
          <td>Options</td>
          <td>Prix</td>
        </tr>
        <tbody>
          {elementList}
        </tbody>
      </table>
    </>
  )
}
const GeneratePDF = (cart: Product[]) => {
  const invoice = new jsPDF();
  const formAdress = (elem: string) => {
    return (document.getElementById(elem) as HTMLInputElement | HTMLSelectElement)?.value
  }

  var img = new Image()
  img.src = '/img/icon.jpg'
  invoice.addImage(img, 'jpg', 16, 16, 25, 25)

  autoTable(invoice, {
    body: [
      ['Facture Robe de Cour'],
    ],
    theme: 'plain',
    styles: {
      fontSize: 20,
      fontStyle: 'bold'
    },
    startY: 45
  })
  autoTable(invoice, {
    body: [
      ['Robe de Cour', formAdress("cart-firstname-field") + " " + formAdress("cart-lastname-field")],
      ['5 Rue Emile Gilbert', formAdress("cart-street-field")],
      ['75012 Paris', formAdress("cart-postal-field") + " " + formAdress("cart-city-field")],
    ],
    theme: 'plain'
  })

  autoTable(invoice, {
    html: '#PDF-table',
    theme: 'grid',
    styles: { 
      valign: 'middle'
    },
  })

  const totalPrice = () => {
    var price = 0
    for (let i = 0; i < cart.length; i++)
    {
      price += cart[i].price
    }
    return price
  }

  autoTable(invoice, {
    body: [['Total TTC: ' + totalPrice() + '€'], ['Total HT: ' + (totalPrice() / tva).toFixed(2) + '€']],
    theme: 'plain',
    styles: { 
      valign: 'middle',
      fontSize: 15,
      fontStyle: 'bold',
    },
  })

  autoTable(invoice, {
    body: [['Coordonnées de livraison:', '', 'Signature:']],
    theme: 'plain',
    styles: {
      fontSize: 15,
      fontStyle: 'bold'
    }
  })

  autoTable(invoice, {
    // html: '#PDF-client-coordinates',
    body: [
      [formAdress("cart-firstname-field") + ' ' + formAdress("cart-lastname-field")],
      [formAdress("cart-street-field")],
      [formAdress("cart-postal-field") + ' ' + formAdress("cart-city-field")],
      [formAdress("cart-mail-field")],
      [formAdress("cart-phone-field")],
    ],
    theme: 'plain'
  })

  invoice.save("Facture-Robe-de-Cour.pdf");

  return 0
}

const GenerateOptions = (cart: Product[], id: number) => {
  const elementList: JSX.Element[] = [];

  for (let i = 0; i < cart[id].options.length; i++)
  {
    const option = Object.keys(data.confectionPage[data.confectionPage.findIndex((Object) => Object.name == cart[id].name)].options);
    var finalText = option[i]?.replace(/_/g, " ");
    var unit: string = ""

    if (option[i] == undefined)
    {
      var finalText = "ERROR";
    }
    if (i >= 2)
    {
      unit = "cm"
    }

    elementList.push(
      <p key={uuidv4()}>{finalText + ": " + cart[id].options[i] + unit}</p>
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
  console.log(cart);

  for (let i = 0; i < cart.length; i++)
  {
    elementList.push(
      <tr key={uuidv4()}>
        <td>{cart[i].name}</td>
        <td>{GenerateOptions(cart, i)}</td>
        <td>{"TTC: " + cart[i].price + "€"}<br></br>{"HT: " + (cart[i].price / tva).toFixed(2) + "€"}</td>
        <td><button onClick={() => handleRemove(cart[i].id)}>Supprimer l'article</button></td>
      </tr>
    )
  }

  return elementList
}
const computePrice = (cart: Product[]) => {
  var counter = 0
  for (let i = 0; i < cart.length; i++)
  {
    counter += cart[i].price;
  }
  return counter
}
const showCartList = () => {
  //@ts-ignore
  const cart = useAppSelector((state: RootState) => state.cart);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    GeneratePDF(cart);
  }

  if (cart.length == 0)
  {
    return(
      <>
        <p>Vous n'avez pas d'articles dans le panier.</p>
        <p>Consultez nos confections en suivant le lien ci dessous:</p>
        <Link to="/confections" className="btn-underline-effect btn-accent-style">Confections</Link>
      </>
    )
  }
  return(
    <>
      {GeneratePDFTable(cart)}
      <table id="cart-table">
        <thead>
          <tr>
            <th>Article</th>
            <th>Options</th>
            <th>Prix</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {DisplayCartElements(cart)}
        </tbody>
      </table>

      <h2>Total TTC: {computePrice(cart)}€</h2>
      <h2>Total HT: {(computePrice(cart) / tva).toFixed(2)}€</h2>

      <h2>Coordonées de livraison:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cart-lastname-field">Nom</label>
          <br></br>
          <input type="text" id="cart-lastname-field" className="form-text-style" required></input>          
        </div>
        <div>
          <label htmlFor="cart-firstname-field">Prénom</label>
          <br></br>
          <input type="text" id="cart-firstname-field" className="form-text-style" required></input>
        </div>
        <div>
          <label htmlFor="cart-street-field">Numéro et rue</label>
          <br></br>
          <input type="text" id="cart-street-field" className="form-text-style" required></input>
        </div>
        <div>
          <label htmlFor="cart-postalcode-field">Code postal</label>
          <br></br>
          <input type="number" id="cart-postal-field" className="form-text-style" required></input>
        </div>
        <div>
          <label htmlFor="cart-city-field">Ville</label>
          <br></br>
          <input type="text" id="cart-city-field" className="form-text-style" required></input>
        </div>
        <div>
          <label htmlFor="cart-phone-field">Numéro de téléphone</label>
          <br></br>
          <input type="number" id="cart-phone-field" className="form-text-style" required></input>
        </div>
        <div>
          <label htmlFor="cart-mail-field">Email</label>
          <br></br>
          <input type="email" id="cart-mail-field" className="form-text-style" required></input>
        </div>
        <br></br>
        <button type='submit'>Générer la facture</button>
      </form>
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