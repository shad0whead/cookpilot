from fastapi import APIRouter, Depends, HTTPException, status
from typing import Dict, Any, List

router = APIRouter()

@router.get("/")
async def search_recipes(query: str = ""):
    """
    Search for recipes based on a query string
    """
    # This would typically search recipes in a database
    # For now, return sample search results
    sample_results = [
        {
            "id": "1",
            "title": "Spaghetti Carbonara",
            "description": "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
            "media": ["https://images.unsplash.com/photo-1612874742237-6526221588e3"],
            "tags": ["pasta", "italian", "dinner"]
        },
        {
            "id": "2",
            "title": "Chicken Tikka Masala",
            "description": "Grilled chicken chunks in a creamy sauce with Indian spices.",
            "media": ["https://images.unsplash.com/photo-1565557623262-b51c2513a641"],
            "tags": ["chicken", "indian", "curry", "dinner"]
        },
        {
            "id": "3",
            "title": "Avocado Toast",
            "description": "Simple and delicious breakfast with mashed avocado on toasted bread.",
            "media": ["https://images.unsplash.com/photo-1588137378633-dea1336ce1e2"],
            "tags": ["breakfast", "vegetarian", "quick"]
        }
    ]
    
    # Filter results based on query if provided
    if query:
        filtered_results = [
            recipe for recipe in sample_results 
            if query.lower() in recipe["title"].lower() or 
               query.lower() in recipe["description"].lower() or
               any(query.lower() in tag.lower() for tag in recipe["tags"])
        ]
        return filtered_results
    
    return sample_results

@router.get("/ingredients")
async def search_by_ingredients(ingredients: str = ""):
    """
    Search for recipes based on ingredients
    """
    # This would typically search recipes by ingredients in a database
    # For now, return sample search results
    ingredient_list = ingredients.split(",") if ingredients else []
    
    sample_results = [
        {
            "id": "1",
            "title": "Spaghetti Carbonara",
            "description": "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
            "ingredients": ["pasta", "eggs", "cheese", "pancetta", "black pepper"],
            "media": ["https://images.unsplash.com/photo-1612874742237-6526221588e3"]
        },
        {
            "id": "2",
            "title": "Chicken Tikka Masala",
            "description": "Grilled chicken chunks in a creamy sauce with Indian spices.",
            "ingredients": ["chicken", "yogurt", "tomatoes", "cream", "spices"],
            "media": ["https://images.unsplash.com/photo-1565557623262-b51c2513a641"]
        },
        {
            "id": "3",
            "title": "Avocado Toast",
            "description": "Simple and delicious breakfast with mashed avocado on toasted bread.",
            "ingredients": ["avocado", "bread", "lemon juice", "salt", "pepper"],
            "media": ["https://images.unsplash.com/photo-1588137378633-dea1336ce1e2"]
        }
    ]
    
    # Filter results based on ingredients if provided
    if ingredient_list:
        filtered_results = []
        for recipe in sample_results:
            if any(ingredient.lower() in recipe_ingredient.lower() 
                  for ingredient in ingredient_list 
                  for recipe_ingredient in recipe["ingredients"]):
                filtered_results.append(recipe)
        return filtered_results
    
    return sample_results
