import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./cart";

function Panier() {
  //@ts-ignore
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div className="content-container">
      <div>
        <h2>Panier</h2>
        <p>{count}</p>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto sed eum placeat numquam voluptatum accusamus, natus amet maxime quo sit ipsa, optio excepturi ut ea animi dolores? Voluptatibus, quaerat similique.</p>
      </div>
    </div>
  )
}

export default Panier