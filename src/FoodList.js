import {Food} from "./Food";

export function FoodList(props) {
    return <div>
        <h2>All The Food You've Eaten Today</h2>
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