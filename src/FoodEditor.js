import {useState} from "react";

export function FoodEditor(props) {
    const [updatedFood, setUpdatedFood] = useState({...props.food});

    const handleOnSubmit = (event) => {
        event.preventDefault();

        // Ensure the name is entered.
        if (updatedFood.name.length === 0) {
            alert('Please enter a name.');
            return;
        }

        // Ensure the calories value is an integer.
        console.log('Checking calories for an integer.');
        console.log('Calories updatedFood: ' + updatedFood.calories + ' Type: ' + typeof updatedFood.calories);
        console.log('Calories validated:   ' + String(Math.round(Number(updatedFood.calories))));

        if (String(updatedFood.calories) !== String(Math.round(Number(updatedFood.calories)))) {
            console.log('Not a valid number of calories.');
            alert('Please enter a valid number of calories.');
            return;
        }

        props.saveFood(updatedFood);

        // Clear the form.
        setUpdatedFood({...props.food});
    };

    const handleOnChange = (event) => {
        if (event.target.name === 'nameText') {
            setUpdatedFood({
                ...updatedFood,
                name: event.target.value
            });
        } else if (event.target.name === 'caloriesText') {
            setUpdatedFood({
                ...updatedFood,
                calories: event.target.value
            });
        } else if (event.target.name === 'carbsText') {
            setUpdatedFood({
                ...updatedFood,
                carbs: event.target.value
            });
        } else if (event.target.name === 'fatText') {
            setUpdatedFood({
                ...updatedFood,
                fat: event.target.value
            });
        } else if (event.target.name === 'proteinText') {
            setUpdatedFood({
                ...updatedFood,
                protein: event.target.value
            });
        }
    };

    return <>
        <form onSubmit={event => handleOnSubmit(event)}
              onChange={event => handleOnChange(event)}
        >
            <label>Name: </label>
            <input name='nameText'
                   type='text'
                   value={updatedFood.name}
            />

            <label>Calories: </label>
            <input name='caloriesText'
                   type='text'
                   value={updatedFood.calories}
            />

            <label>Carbohydrates: </label>
            <input name='carbsText'
                   type='text'
                   value={updatedFood.carbs}
            />

            <label>Fat: </label>
            <input name='fatText'
                   type='text'
                   value={updatedFood.fat}
            />

            <label>Protein: </label>
            <input name='proteinText'
                   type='text'
                   value={updatedFood.protein}
            />

            <button>Save</button>
        </form>
    </>
}