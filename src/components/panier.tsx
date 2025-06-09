import { useAppSelector } from '../redux/hooks.ts'; 
import { Link } from "react-router-dom";
import { RootState } from "@reduxjs/toolkit/query";
import { v4 as uuidv4 } from 'uuid';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useReducer } from 'react';

const tva = 1.2;

const GeneratePDFTable = () => {
  const elementList: JSX.Element[] = [];

  for (let i = 0; i < localStorage.length ; i++)
    {
      const optionList: JSX.Element[] = [];

      const storageItemID = localStorage.key(i);
      const storageItem = JSON.parse(localStorage.getItem(storageItemID as string) as string);

      var unit = ""

      for (let j = 0; j < storageItem.options.length ; j++)
      {
        const finalText = storageItem.options[j]?.replace(/_/g, " ");
        if (j >= 2)
        {
          unit = " cm"
        }
        if (j == 0)
        {
          optionList.push(
            <p key={uuidv4()}>{finalText + unit}</p>
          )
        }
        else
        {
          optionList.push(
            <p key={uuidv4()}><br></br>{finalText + unit}</p>
          )        
        }
      }
      elementList.push(
          <tr key={uuidv4()}>
            <th>{storageItem.name}</th>
            <th>{optionList}</th>
            <th>{"TTC: " + storageItem.price + "€"}<br></br>{"HT: " + (storageItem.price / tva).toFixed(2) + "€"}</th>
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
const GeneratePDF = () => {
  const invoice = new jsPDF();

  const formAdress = (elem: string) => {
    return (document.getElementById(elem) as HTMLInputElement | HTMLSelectElement)?.value
  }

  var img = new Image()
  img.src = '/img/icon.jpg'
  invoice.addImage(img, 'jpg', 16, 16, 25, 25)

  autoTable(invoice, {
    body: [
      ['Bon de commande Robe de Cour'],
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

    for (let i = 0; i < localStorage.length; i++)
    {
      const storageItemID = localStorage.key(i);
      const storageItem = JSON.parse(localStorage.getItem(storageItemID as string) as string);
      price += storageItem.price
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

  return 0;
}

const GenerateOptions = (itemIndex: number) => {
  const elementList: JSX.Element[] = [];
  const storageItemID = localStorage.key(itemIndex);
  const storageItem = JSON.parse(localStorage.getItem(storageItemID as string) as string);


  for (let i = 0; i < storageItem.options.length; i++)
  {
    var finalText = storageItem.options[i]?.replace(/_/g, " ");
    var unit: string = "";

    if (i >= 2)
    {
      unit = " cm"
    }

    elementList.push(
      <p key={uuidv4()}>{finalText + unit}</p>
    )
  }

  return (elementList)
}

const DisplayCartElements = (forceUpdateFunc: any) => {
  const elementList: JSX.Element[] = [];

  const handleRemove = (id: string) => {
    localStorage.removeItem(id);
    forceUpdateFunc();
  };

  for (let i = 0; i < localStorage.length; i++)
  {
    const webStorageItemKey = localStorage.key(i);
    const webStorageItem = JSON.parse(localStorage.getItem(webStorageItemKey as string) as string);

    elementList.push(
      <tr key={uuidv4()}>
        <td>{webStorageItem.name}</td>
        <td>{GenerateOptions(i)}</td>
        <td>{"TTC: " + webStorageItem.price + "€"}<br></br>{"HT: " + (webStorageItem.price / tva).toFixed(2) + "€"}</td>
        <td><button onClick={() => handleRemove(webStorageItem.id)}>Supprimer l'article</button></td>
      </tr>
    )
  }

  return elementList
}
const computePrice = () => {
  var counter = 0

  for (let i = 0; i < localStorage.length; i++)
  {
    const storageItemID = localStorage.key(i);
    const storageItem = JSON.parse(localStorage.getItem(storageItemID as string) as string);
    counter += storageItem.price;
  }
  return counter
}
const showCartList = (forceUpdateFunc: any) => {
  //@ts-ignore
  const cart = useAppSelector((state: RootState) => state.cart);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    GeneratePDF();
  }

  if (localStorage.length == 0)
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
      {GeneratePDFTable()}
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
          {DisplayCartElements(() => forceUpdateFunc())}
        </tbody>
      </table>

      <h2>Total TTC: {computePrice()}€</h2>
      <h2>Total HT: {(computePrice() / tva).toFixed(2)}€</h2>

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
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  return (
    <div className="content-container">
      <div>
        <h2>Panier</h2>
          {showCartList(() => forceUpdate())}
      </div>
    </div>
  )
}

export default Panier