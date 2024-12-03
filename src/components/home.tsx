
import { Link } from "react-router-dom"
import HomeImg from "/img/home-img.jpg"

function Home() {

  return (
    <div className="content-container">
      <div>
        <h2>Notre société</h2>
        <p>Eric et Nordine artisans vous proposent des robes sur mesure, un travail raffiné exécuté dans des tissus soigneusement sélectionnés parmi les meilleurs fournisseurs français. Des robes personnalisables, doublures, passepoil, fermetures aimantées, remonte-manche sont possibles. Un modèle de robe lavable en machine à 30 degrés. Profitez d’une sélection de robe prêtes à plaider.</p>
        <img className="homepage-img" src={HomeImg}></img>
        <h2>Commander votre robe</h2>
        <p>Vous souhaitez commander votre robe? suivez le lien ci-dessous:</p>
        <Link to="/confections" className="btn-underline-effect">Confections</Link>
      </div>    
    </div>
  )
}

export default Home