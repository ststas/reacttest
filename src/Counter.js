import { observer } from "mobx-react-lite"
import { counterStore } from "./stores/counter-store"

function Counter () {

    return (
      <div>
        <button onClick={()=>counterStore.increase(1)}>INCR</button>
        <p>{counterStore.count}</p>
        <button onClick={()=>counterStore.decrease(1)}>DECR</button>
      </div>
    )

}
export default observer(Counter)
