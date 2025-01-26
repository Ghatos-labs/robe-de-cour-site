import { Link } from "react-router-dom"

function Footer() {
  return (
      <div id="footer">
        <div>
          <h1>Mentions légales</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia fuga expedita commodi provident hic alias nesciunt explicabo perferendis libero. Temporibus consectetur laudantium odit placeat delectus quisquam quas dolores veritatis laborum.</p>
          <Link to="/cgv">Conditions générales de vente</Link>
          <p>5 rue Emile Gilbert, 75012 Paris</p>
          <p>01 40 02 03 55</p>
        </div>
      </div>
  )
}

export default Footer