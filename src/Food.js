import {useState} from "react";
import {FoodEditor} from "./FoodEditor";

export function Food(props) {
    const [editing, setEditing] = useState(false);

    const saveFood = (updatedFood) => {
        setEditing(false);
        props.updateFood(updatedFood);
    };

    const renderFoodOrFoodEditor = () => {
        if (editing) {
            return <>
                <FoodEditor food={props.food}
                            saveFood={(updatedFood) => saveFood(updatedFood)}
                />
            </>
        } else {
            return <>
                <label>
                    {props.food.name}, {props.food.calories} Calories
                </label>
                <button onClick={() => setEditing(true)}
                >Edit
                </button>
            </>
        }
    };

    return <li>
        {renderFoodOrFoodEditor()}
        <button onClick={() => props.deleteFood(props.food.id)}
        >Delete
        </button>
    </li>;
}