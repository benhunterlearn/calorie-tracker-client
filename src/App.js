import {CalorieSummary} from "./CalorieSummary";
import {AddFoodForm} from "./AddFoodForm";
import {FoodList} from "./FoodList";
import {useEffect, useState} from "react";

function App() {
    const [foods, setFoods] = useState([]);
    const [calorieTotal, setCalorieTotal] = useState(0);

    // Load initial data from the server.
    useEffect(() => {
        loadFoods();
    }, []);

    const loadFoods = () => {
        fetch('http://localhost:8080/food')
            .then(response => response.json())
            .then(json => setFoods(json));
    };

    // Update the calorieTotal when food changes
    useEffect(() => {
        let newCalorieTotal = 0;
        foods.forEach((food) => {
            newCalorieTotal += food.calories;
        });
        setCalorieTotal(newCalorieTotal);
        console.log('setCalorieTotal: ' + newCalorieTotal.toString());
    }, [foods]);

    function addFood(newFood) {
        alert('Adding new food.');
        // Fetch POST to create new food.
        fetch('http://localhost:8080/food', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFood),
        })
            .then(response => response.json())
            // Update foods immediately.
            .then(json => {
                setFoods([...foods, json]);
                // Load food to refresh data from the server.
                loadFoods();
            })
    }

    const deleteFood = (foodId) => {
        // DELETE request to server.
        fetch('http://localhost:8080/food/' + foodId.toString(), {
            method: 'DELETE',
        })
            .then(response => {
                // Remove from foods in client state.
                setFoods([...foods.filter(food => food.id !== foodId)]);

                // Load all foods from the server to refresh the data.
                loadFoods();
            });
    }

    return (
        <div>
            <h1>Calorie Tracker</h1>
            <CalorieSummary calories={calorieTotal}/>
            <FoodList foods={foods}
                      deleteFood={(foodId) => deleteFood(foodId)}
            />
            <AddFoodForm addFood={(newFood) => (addFood(newFood))}/>
        </div>
    );
}

export default App;
