import { Link } from "react-router-dom"
import Image from './image'
import HomeImg1 from "/img/design-1-img.jpg"
import HomeImg2 from "/img/design-2-img.jpg"
import HomeImg3 from "/img/design-3-img.jpg"
import HomeImg4 from "/img/design-4-img.jpg"
import HomeImg5 from "/img/design-5-img.jpg"

function Home() {

  return (
    <div className="content-container">
      <div>
        <h2>Notre société</h2>
        <p>Eric et Nordine artisans vous proposent des robes sur mesure, un travail raffiné exécuté dans des tissus soigneusement sélectionnés parmi les meilleurs fournisseurs français. Des robes personnalisables, doublures, passepoil, fermetures aimantées, remonte-manche sont possibles. Un modèle de robe lavable en machine à 30 degrés. Profitez d’une sélection de robe prêtes à plaider.</p>
        <div className="homepage-img-container">
          <Image source={HomeImg1} containerClass={"homepage-img-lazyload-bg"}/>
          <Image source={HomeImg2} containerClass={"homepage-img-lazyload-bg"}/>
        </div>
        <div className="homepage-img-container">
          <Image source={HomeImg3} containerClass={"homepage-img-lazyload-bg"}/>
          <Image source={HomeImg4} containerClass={"homepage-img-lazyload-bg"}/>
          <Image source={HomeImg5} containerClass={"homepage-img-lazyload-bg"}/>
        </div>
        <h2>Comment passer votre commande?</h2>
        <ul>
          <li>Rendez-vous sur la <Link to="/confections" className="btn-underline-effect">page de confections</Link> puis sélectionnez les articles et les options que vous désirez.</li>
          <li>Une fois tout vos articles ajoutés au panier, allez au <Link to="/panier" className="btn-underline-effect">panier</Link> pour obtenir votre facture.</li>
          <li>Une fois imprimée et signée, envoyez-la avec un chèque par voie postale à l'adresse suivante:
            <ul>
              <li>5 rue Emile Gilbert, 75012 Paris</li>
            </ul>
          </li>
          <li>Vous recevrez votre robe sous 5 jours ouvrés.</li>
        </ul>
      </div>    
    </div>
  )
}

export default Home