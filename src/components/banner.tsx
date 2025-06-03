//change this from "/img/" to "/robe-de-cour-site/img/" to adapt for github version
const sourceTemplate = "/robe-de-cour-site/img/";

function Banner() {
  return (
      <div className="banner">
        <div id="banner-title-container">
          <img src={sourceTemplate + "icon.svg"}></img>
          <h1>Robe de Cour</h1>
        </div>
        <p>Eric Bilion Chaibi & Nordine - Artisans costumier diplômés</p>
      </div>
  )
}

export default Banner