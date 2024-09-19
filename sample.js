// Event listener to save the meal plan
document.getElementById('save-button').addEventListener('click', async () => {
    const day = document.getElementById('day').value;
    const breakfast = document.getElementById('breakfast').value;
    const lunch = document.getElementById('lunch').value;
    const dinner = document.getElementById('dinner').value;

    const mealPlanData = {
        breakfast,
        lunch,
        dinner,
        totalCalories: calculateCalories(breakfast, lunch, dinner),
        totalProtein: calculateProtein(breakfast, lunch, dinner),
    };

    try {
        const response = await fetch('http://localhost:3000/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ day, data: mealPlanData }),
        });

        if (response.ok) {
            alert('Meal Plan Saved Successfully!');
        } else {
            const errorText = await response.text();
            console.error('Server error:', errorText);
            alert('Error saving meal plan: ' + errorText);
        }
    } catch (error) {
        console.error('Error saving meal plan:', error);
        alert('An error occurred. Check the console for details.');
    }
});

// Function to delete all meal data
document.getElementById('delete-button').addEventListener('click', async () => {
    const confirmDelete = confirm("Are you sure you want to delete all previous meal data?");
    if (!confirmDelete) return;

    try {
        const response = await fetch('http://localhost:3000/delete-data', {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('All previous meal data deleted successfully!');
        } else {
            const errorText = await response.text();
            console.error('Server error:', errorText);
            alert('Error deleting meal data: ' + errorText);
        }
    } catch (error) {
        console.error('Error deleting meal data:', error);
        alert('An error occurred. Check the console for details.');
    }
});

// Function to calculate total calories
function calculateCalories(breakfast, lunch, dinner) {
    const foodData = {
        "Easy Hard-Boiled Eggs": 78,
        "Chicken Caesar Salad": 480,
        "Fresh Tomato Pasta": 320,
        "Fluffy Pancakes": 350,
        "Vegetable Omelette": 150,
        "Berry Smoothie": 180,
        "Avocado Toast": 240,
        "Yogurt Parfait": 150,
        "Egg Benedict": 420,
        "Smoothie Bowl": 300,
        "Chia Pudding": 240,
        "Whole Grain Cereal": 120,
        "Breakfast Burrito": 390,
        "Fruit Salad": 90,
        "Toast with Toppings": 200,
        "Paneer Butter Masala": 350,
        "Chole Bhature": 450,
        "Masala Dosa": 300,
        "Chicken Tikka Masala": 350,
        "Biryani": 400,
        "Butter Chicken": 490,
        "Dal Makhani": 320,
        "Pulao": 290,
        "Aloo Paratha": 300,
        "Samosa": 250,
        "Rajma Chawal": 350,
        "Pani Puri": 150,
        "Gulab Jamun": 300,
        "Pav Bhaji": 400,
        "Vada Pav": 300,
        "Kadai Paneer": 380,
        "Tandoori Chicken": 270,
        "Aloo Gobi": 200,
        "Palak Paneer": 340,
        "Malai Kofta": 400
    };

    return (foodData[breakfast] || 0) + (foodData[lunch] || 0) + (foodData[dinner] || 0);
}

// Function to calculate total protein
function calculateProtein(breakfast, lunch, dinner) {
    const proteinData = {
        "Easy Hard-Boiled Eggs": 6.3,
        "Chicken Caesar Salad": 31.5,
        "Fresh Tomato Pasta": 17.5,
        "Fluffy Pancakes": 48.0,
        "Vegetable Omelette": 12.0,
        "Berry Smoothie": 2.0,
        "Avocado Toast": 34.0,
        "Yogurt Parfait": 35.0,
        "Egg Benedict": 33.0,
        "Smoothie Bowl": 12.0,
        "Chia Pudding": 25.0,
        "Whole Grain Cereal": 6.0,
        "Breakfast Burrito": 20.0,
        "Fruit Salad": 0.5,
        "Toast with Toppings": 15.0,
        "Paneer Butter Masala": 15.0,
        "Chole Bhature": 13.0,
        "Masala Dosa": 8.0,
        "Chicken Tikka Masala": 27.0,
        "Biryani": 20.0,
        "Butter Chicken": 22.0,
        "Dal Makhani": 16.0,
        "Pulao": 7.0,
        "Aloo Paratha": 5.0,
        "Samosa": 4.0,
        "Rajma Chawal": 13.0,
        "Pani Puri": 3.0,
        "Gulab Jamun": 2.0,
        "Pav Bhaji": 8.0,
        "Vada Pav": 7.0,
        "Kadai Paneer": 18.0,
        "Tandoori Chicken": 24.0,
        "Aloo Gobi": 10.0,
        "Palak Paneer": 25.0,
        "Malai Kofta": 20.0
    };

    return (proteinData[breakfast] || 0) + (proteinData[lunch] || 0) + (proteinData[dinner] || 0);
}

// Event listener to calculate nutrients
document.getElementById('calculate-button').addEventListener('click', () => {
    const breakfast = document.getElementById('breakfast').value;
    const lunch = document.getElementById('lunch').value;
    const dinner = document.getElementById('dinner').value;

    const totalCalories = calculateCalories(breakfast, lunch, dinner);
    const totalProtein = calculateProtein(breakfast, lunch, dinner);

    document.getElementById('total-calories').textContent = totalCalories;
    document.getElementById('total-protein').textContent = totalProtein;
});
