import {Food} from "./Food";

export function FoodList(props) {
    return <div>
        <h2>Food List</h2>
        <ul>
            {props.foods.map((food) => {
                return <Food food={food}
                             deleteFood={props.deleteFood}
                             key={food.id}
                             updateFood={props.updateFood}
                />
            })}
        </ul>
    </div>
}