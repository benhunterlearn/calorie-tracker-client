import {useState} from "react";

export function AddFoodForm(props) {
    const emptyFood = {
        name: '',
        calories: '',
        carbs: '',
        fat: '',
        protein: '',
    };

    const [newFood, setNewFood] = useState({...emptyFood});

    const handleOnSubmit = (event) => {
        event.preventDefault();

        // Ensure the name is entered.
        if (newFood.name.length === 0) {
            alert('Please enter a name.');
            return;
        }

        // Ensure the calories value is an integer.
        console.log('Checking calories for an integer.');
        console.log('Calories: ' + newFood.calories);
        console.log(String(Math.round(Number(newFood.calories))));
        if (newFood.calories !== String(Math.round(Number(newFood.calories)))) {
            console.log('Not a valid number of calories.');
            alert('Please enter a valid number of calories.');
            return;
        }

        props.addFood(newFood);

        // Clear the form.
        setNewFood({...emptyFood});
    };

    const handleOnChange = (event) => {
        if (event.target.name === 'nameText') {
            setNewFood({
                ...newFood,
                name: event.target.value
            });
        } else if (event.target.name === 'caloriesText') {
            setNewFood({
                ...newFood,
                calories: event.target.value
            });
        } else if (event.target.name === 'carbsText') {
            setNewFood({
                ...newFood,
                carbs: event.target.value
            });
        } else if (event.target.name === 'fatText') {
            setNewFood({
                ...newFood,
                fat: event.target.value
            });
        } else if (event.target.name === 'proteinText') {
            setNewFood({
                ...newFood,
                protein: event.target.value
            });
        }
    };

    return <div>
        <h2>Eat More Food</h2>
        <form onSubmit={event => handleOnSubmit(event)}
              onChange={event => handleOnChange(event)}
        >
            <label>Name: </label>
            <input name='nameText'
                   type='text'
                   value={newFood.name}
            />

            <label>Calories: </label>
            <input name='caloriesText'
                   type='text'
                   value={newFood.calories}
            />

            <label>Carbohydrates: </label>
            <input name='carbsText'
                   type='text'
                   value={newFood.carbs}
            />

            <label>Fat: </label>
            <input name='fatText'
                   type='text'
                   value={newFood.fat}
            />

            <label>Protein: </label>
            <input name='proteinText'
                   type='text'
                   value={newFood.protein}
            />

            <button>Eat</button>
        </form>
    </div>
}