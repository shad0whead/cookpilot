from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any, List

router = APIRouter()

@router.get("/")
async def get_recipes():
    """
    Get all recipes
    """
    # This would typically fetch recipes from a database
    # For now, return sample recipes
    sample_recipes = [
        {
            "id": "1",
            "title": "Spaghetti Carbonara",
            "description": "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
            "media": ["https://images.unsplash.com/photo-1612874742237-6526221588e3"],
            "prep_time": 10,
            "cook_time": 15,
            "servings": 4,
            "tags": ["pasta", "italian", "dinner"]
        },
        {
            "id": "2",
            "title": "Chicken Tikka Masala",
            "description": "Grilled chicken chunks in a creamy sauce with Indian spices.",
            "media": ["https://images.unsplash.com/photo-1565557623262-b51c2513a641"],
            "prep_time": 20,
            "cook_time": 30,
            "servings": 4,
            "tags": ["chicken", "indian", "curry", "dinner"]
        },
        {
            "id": "3",
            "title": "Avocado Toast",
            "description": "Simple and delicious breakfast with mashed avocado on toasted bread.",
            "media": ["https://images.unsplash.com/photo-1588137378633-dea1336ce1e2"],
            "prep_time": 5,
            "cook_time": 5,
            "servings": 1,
            "tags": ["breakfast", "vegetarian", "quick"]
        }
    ]
    return sample_recipes

@router.get("/{recipe_id}")
async def get_recipe(recipe_id: str):
    """
    Get a specific recipe by ID
    """
    # This would typically fetch a recipe from a database
    # For now, return a sample recipe
    sample_recipe = {
        "id": recipe_id,
        "title": "Spaghetti Carbonara",
        "description": "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
        "media": ["https://images.unsplash.com/photo-1612874742237-6526221588e3"],
        "prep_time": 10,
        "cook_time": 15,
        "servings": 4,
        "ingredients": [
            {"name": "Spaghetti", "amount": "400g"},
            {"name": "Pancetta", "amount": "150g"},
            {"name": "Eggs", "amount": "3"},
            {"name": "Parmesan cheese", "amount": "50g"},
            {"name": "Black pepper", "amount": "to taste"},
            {"name": "Salt", "amount": "to taste"}
        ],
        "instructions": [
            "Bring a large pot of salted water to boil and cook spaghetti according to package instructions.",
            "While pasta is cooking, fry pancetta in a large pan until crispy.",
            "In a bowl, whisk eggs and grated parmesan cheese.",
            "Drain pasta, reserving some cooking water.",
            "Add pasta to the pan with pancetta, remove from heat.",
            "Quickly stir in egg mixture, adding some reserved cooking water if needed to create a creamy sauce.",
            "Season with black pepper and serve immediately."
        ],
        "tags": ["pasta", "italian", "dinner"]
    }
    return sample_recipe

@router.post("/")
async def create_recipe(recipe: Dict[str, Any]):
    """
    Create a new recipe
    """
    # This would typically save a recipe to a database
    # For now, just return a success message
    return {"message": "Recipe created successfully", "id": "new-recipe-id"}

@router.put("/{recipe_id}")
async def update_recipe(recipe_id: str, recipe: Dict[str, Any]):
    """
    Update an existing recipe
    """
    # This would typically update a recipe in a database
    # For now, just return a success message
    return {"message": f"Recipe {recipe_id} updated successfully"}

@router.delete("/{recipe_id}")
async def delete_recipe(recipe_id: str):
    """
    Delete a recipe
    """
    # This would typically delete a recipe from a database
    # For now, just return a success message
    return {"message": f"Recipe {recipe_id} deleted successfully"}
