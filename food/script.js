const recipeContainer = document.getElementById("recipe-container");
const searchInput = document.getElementById("search-bar");

async function fetchRecipes() {
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json(); 
    console.log("Fetched Recipes:", data.recipes); 
    return data.recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return []; 
  }
}

function displayRecipes(recipes) {
  recipeContainer.innerHTML = ""; 

  if (!recipes || recipes.length === 0) {
    recipeContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";


    const imageUrl = recipe.image || "https://via.placeholder.com/300x200?text=No+Image";

    recipeCard.innerHTML = `
      <img src="${imageUrl}" alt="${recipe.name}">
      <div class="content">
        <h3>${recipe.name}</h3>
        <h4>Ingredients:</h4>
        <ul>
          ${recipe.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}
        </ul>
        <h4>Instructions:</h4>
        <ol>
          ${recipe.instructions
            .map((instruction) => `<li>${instruction}</li>`)
            .join("")}
        </ol>
      </div>
    `;
    recipeContainer.appendChild(recipeCard);
  });
}

function filterRecipes(recipes, query) {
  return recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query.toLowerCase()) ||
    recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(query.toLowerCase())
    )
  );
}


searchInput.addEventListener("input", async function () {
  const query = searchInput.value.trim();
  const allRecipes = await fetchRecipes(); 
  const filteredRecipes = filterRecipes(allRecipes, query); 
  displayRecipes(filteredRecipes); 
});


async function init() {
  const recipes = await fetchRecipes(); 
  displayRecipes(recipes); 
}

init();
