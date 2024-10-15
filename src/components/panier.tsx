import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, push } from "./cart";

const showCartList = () => {
  //@ts-ignore
  const count = useSelector((state) => state.counter.list);
  const elementList: JSX.Element[] = [];

  for(let i = 0; i < count.length; i++)
  {
      elementList.push
      (
          <p key={i}>{count[i]}</p>
      );            
  }
  return(elementList);
}

function Panier() {
  //@ts-ignore
  // const count = useSelector((state) => state.counter.count);
  // const dispatch = useDispatch();
  return (
    <div className="content-container">
      <div>
        <h2>Panier</h2>
        {/* <p>{count}</p>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <br></br>
        <button onClick={() => dispatch(push(["a", "b"]))}>Add element</button> */}
        {showCartList()}
      </div>
    </div>
  )
}

export default Panier