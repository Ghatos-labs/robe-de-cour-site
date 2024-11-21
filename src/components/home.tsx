
import HomeImg from "/home-img.jpg"

function Home() {

  return (
    <div className="content-container">
      <div>
        <div>
          <h2>Qui sommes-nous?</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi minus magnam dolores nam saepe. Suscipit vitae voluptatem architecto illo, illum at dolorem in ab voluptatum eos quam quos quaerat? Placeat!</p>
        </div>
        <img className="homepage-img" src={HomeImg}></img>
        <div>
          <h2>Comment passer une commande?</h2>        
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi minus magnam dolores nam saepe. Suscipit vitae voluptatem architecto illo, illum at dolorem in ab voluptatum eos quam quos quaerat? Placeat!</p>           
        </div>
      </div>
    </div>
  )
}

export default Home