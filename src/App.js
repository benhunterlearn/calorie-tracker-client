import {CalorieSummary} from "./CalorieSummary";
import {AddFoodForm} from "./AddFoodForm";
import {FoodList} from "./FoodList";
import {useEffect, useState} from "react";

function ExerciseList(props) {
    return <>Exercises you've done today</>;
}

function AddExerciseForm(props) {
    return <>Do more exercise</>;
}

function App() {
    const [foods, setFoods] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [calorieTotal, setCalorieTotal] = useState(0);

    // Load initial data from the server.
    useEffect(() => {
        loadFoods();
        loadExercises();
    }, []);

    const loadFoods = () => {
        fetch('http://localhost:8080/food')
            .then(response => response.json())
            .then(json => setFoods(json));
    };

    const loadExercises = () => {
        fetch('http://localhost:8080/exercise')
            .then(response => response.json())
            .then(json => setExercises(json))
            .catch(reason => console.log(reason));
    };

    // Update the calorieTotal when food or exercises changes
    useEffect(() => {
        let newCalorieTotal = 0;
        foods.forEach((food) => {
            newCalorieTotal += food.calories;
        });
        setCalorieTotal(newCalorieTotal);
        console.log('setCalorieTotal: ' + newCalorieTotal.toString());
    }, [foods, exercises]);

    function addFood(newFood) {
        console.log('Adding new food.');
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

    const updateFood = (updatedFood) => {
        console.log('updating food');

        fetch('http://localhost:8080/food/' + updatedFood.id.toString(), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFood),
        })
            .then(response => response.json())
            .then(json => {
                // Update the state by replacing updatedFood in foods.
                const foodsUpdated = foods.map((food) => {
                    if (food.id === json.id) {
                        return json;
                    } else {
                        return food;
                    }
                });
                setFoods([...foodsUpdated]);

                // Load all foods from the server to refresh the data.
                loadFoods();
            })
    };

    const deleteExercise = (exerciseId) => {
        alert('delete exercise');
    }

    const updateExercise = (updatedExercise) => {
        alert('update exercise');
    }

    const addExercise = (newExercise) => {
        alert('add exercise');
    }

    return (
        <div>
            <h1>Calorie Tracker</h1>
            <CalorieSummary calories={calorieTotal}/>
            <FoodList foods={foods}
                      deleteFood={(foodId) => deleteFood(foodId)}
                      updateFood={(updatedFood) => updateFood(updatedFood)}
            />
            <AddFoodForm addFood={(newFood) => (addFood(newFood))}/>
            <ExerciseList exercise={exercises}
                          deleteExercise={(exerciseId) => deleteExercise(exerciseId)}
                          updateExercise={(updatedExercise) => updateExercise(updatedExercise)}
            />
            <AddExerciseForm addExercise={(newExercise) => (addExercise(newExercise))}/>
        </div>
    );
}

export default App;
