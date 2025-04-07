import os
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from pymongo import MongoClient, ASCENDING, TEXT
from .auth import get_current_user, TokenData

# Connect to MongoDB
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client.cookpilot

# Create text index for search functionality if it doesn't exist
if "name_text_description_text_tags_text" not in db.recipes.index_information():
    db.recipes.create_index([
        ("name", TEXT), 
        ("description", TEXT),
        ("tags", TEXT)
    ])

# Create router
router = APIRouter()

# Helper function to convert ObjectId to string
def object_id_to_str(obj):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if isinstance(v, ObjectId):
                obj[k] = str(v)
            elif isinstance(v, dict) or isinstance(v, list):
                object_id_to_str(v)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            if isinstance(v, ObjectId):
                obj[i] = str(v)
            elif isinstance(v, dict) or isinstance(v, list):
                object_id_to_str(v)
    return obj

# Models
class RecipeSearchResult(BaseModel):
    id: str
    name: str
    description: str
    tags: Optional[List[str]] = []
    created_by: str
    created_at: datetime
    score: Optional[float] = None

# Routes
@router.get("/recipes", response_model=List[RecipeSearchResult])
async def search_recipes(
    q: Optional[str] = None,
    tags: Optional[List[str]] = Query(None),
    ingredient: Optional[str] = None,
    created_by: Optional[str] = None,
    current_user: TokenData = Depends(get_current_user),
    skip: int = 0,
    limit: int = 20
):
    """
    Search for recipes based on various criteria
    
    - q: Text search query for recipe name, description, and tags
    - tags: Filter by specific tags
    - ingredient: Filter by ingredient name
    - created_by: Filter by creator's ID
    """
    # Build query
    query = {"is_latest_version": True}
    
    # Text search
    if q:
        query["$text"] = {"$search": q}
    
    # Tag filter
    if tags:
        query["tags"] = {"$all": tags}
    
    # Ingredient filter
    if ingredient:
        query["ingredients.name"] = {"$regex": ingredient, "$options": "i"}
    
    # Creator filter
    if created_by:
        query["created_by"] = created_by
    
    # Execute search
    if q:
        # With text search, we can get relevance score
        results = list(db.recipes.find(
            query,
            {"score": {"$meta": "textScore"}}
        ).sort([("score", {"$meta": "textScore"})]).skip(skip).limit(limit))
    else:
        # Without text search, sort by creation date
        results = list(db.recipes.find(query).sort("created_at", ASCENDING).skip(skip).limit(limit))
    
    return object_id_to_str(results)

@router.get("/ingredients")
async def search_ingredients(q: str, current_user: TokenData = Depends(get_current_user), limit: int = 10):
    """
    Search for ingredients to assist with recipe creation
    
    This endpoint would typically connect to Spoonacular API for comprehensive
    ingredient data, but for this example we'll use a simplified approach.
    """
    # In a real implementation, this would call Spoonacular API
    # For this example, we'll return a static list filtered by the query
    
    # Sample ingredient list
    ingredients = [
        {"name": "All-purpose flour", "unit": "g"},
        {"name": "Granulated sugar", "unit": "g"},
        {"name": "Brown sugar", "unit": "g"},
        {"name": "Butter", "unit": "g"},
        {"name": "Eggs", "unit": "whole"},
        {"name": "Vanilla extract", "unit": "ml"},
        {"name": "Baking powder", "unit": "g"},
        {"name": "Baking soda", "unit": "g"},
        {"name": "Salt", "unit": "g"},
        {"name": "Milk", "unit": "ml"},
        {"name": "Heavy cream", "unit": "ml"},
        {"name": "Chocolate chips", "unit": "g"},
        {"name": "Cocoa powder", "unit": "g"},
        {"name": "Cinnamon", "unit": "g"},
        {"name": "Nutmeg", "unit": "g"},
        {"name": "Olive oil", "unit": "ml"},
        {"name": "Vegetable oil", "unit": "ml"},
        {"name": "Honey", "unit": "ml"},
        {"name": "Maple syrup", "unit": "ml"},
        {"name": "Lemon juice", "unit": "ml"}
    ]
    
    # Filter by query
    filtered = [i for i in ingredients if q.lower() in i["name"].lower()]
    
    # Limit results
    return filtered[:limit]

@router.get("/nutritional-info")
async def get_nutritional_info(ingredient: str, amount: float, unit: str, current_user: TokenData = Depends(get_current_user)):
    """
    Get nutritional information for an ingredient
    
    This endpoint would connect to Spoonacular API for nutritional data,
    but for this example we'll return sample data.
    """
    # In a real implementation, this would call Spoonacular API
    # For this example, we'll return sample data
    
    # Sample nutritional data (per 100g)
    nutritional_data = {
        "flour": {
            "calories": 364,
            "protein": 10.33,
            "fat": 1.0,
            "carbohydrates": 76.31,
            "fiber": 2.7
        },
        "sugar": {
            "calories": 387,
            "protein": 0,
            "fat": 0,
            "carbohydrates": 99.98,
            "fiber": 0
        },
        "butter": {
            "calories": 717,
            "protein": 0.85,
            "fat": 81.11,
            "carbohydrates": 0.06,
            "fiber": 0
        },
        "eggs": {
            "calories": 155,
            "protein": 12.56,
            "fat": 10.61,
            "carbohydrates": 1.12,
            "fiber": 0
        }
    }
    
    # Find matching ingredient
    ingredient_key = None
    for key in nutritional_data.keys():
        if key in ingredient.lower():
            ingredient_key = key
            break
    
    if not ingredient_key:
        # Default data if no match
        return {
            "ingredient": ingredient,
            "amount": amount,
            "unit": unit,
            "nutritional_info": {
                "calories": 0,
                "protein": 0,
                "fat": 0,
                "carbohydrates": 0,
                "fiber": 0
            },
            "note": "Nutritional data not available for this ingredient"
        }
    
    # Calculate based on amount
    base_data = nutritional_data[ingredient_key]
    
    # Convert to 100g equivalent for calculation
    # This is a simplified conversion - a real implementation would be more sophisticated
    conversion_factor = 1.0
    if unit == "g":
        conversion_factor = amount / 100
    elif unit == "ml":
        conversion_factor = amount / 100
    elif unit == "whole" and "egg" in ingredient.lower():
        conversion_factor = amount * 0.5  # Assuming 1 egg is about 50g
    
    # Calculate nutritional values
    result = {
        "ingredient": ingredient,
        "amount": amount,
        "unit": unit,
        "nutritional_info": {
            "calories": round(base_data["calories"] * conversion_factor, 2),
            "protein": round(base_data["protein"] * conversion_factor, 2),
            "fat": round(base_data["fat"] * conversion_factor, 2),
            "carbohydrates": round(base_data["carbohydrates"] * conversion_factor, 2),
            "fiber": round(base_data["fiber"] * conversion_factor, 2)
        }
    }
    
    return result
