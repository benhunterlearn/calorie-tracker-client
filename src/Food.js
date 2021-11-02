export function Food(props) {
    return <li>
        <label>
            {props.food.name}, {props.food.calories} Calories
        </label>
        <button onClick={()=>alert('Edit ' + props.food.name)}
        >Edit</button>
        <button onClick={()=>props.deleteFood(props.food.id)}
        >Delete</button>
    </li>;
}