from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId
import pymongo
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client.cookpilot_db

# Helper for ObjectId conversion
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

# Ingredient model
class IngredientModel(BaseModel):
    name: str
    quantity: float
    unit: str
    notes: Optional[str] = None

# Step model
class StepModel(BaseModel):
    order: int
    description: str
    time: Optional[int] = None
    temperature: Optional[dict] = None
    media: Optional[List[str]] = None

# Recipe models
class RecipeBase(BaseModel):
    title: str
    description: Optional[str] = None
    chef_id: str
    ingredients: List[IngredientModel]
    steps: List[StepModel]
    tags: Optional[List[str]] = None
    cuisine: Optional[str] = None
    prep_time: Optional[int] = None
    cook_time: Optional[int] = None
    servings: Optional[int] = None
    media: Optional[List[str]] = None
    nutrition: Optional[dict] = None
    scaling_factors: Optional[dict] = None
    version: int = 1

class RecipeCreate(RecipeBase):
    pass

class RecipeUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    ingredients: Optional[List[IngredientModel]] = None
    steps: Optional[List[StepModel]] = None
    tags: Optional[List[str]] = None
    cuisine: Optional[str] = None
    prep_time: Optional[int] = None
    cook_time: Optional[int] = None
    servings: Optional[int] = None
    media: Optional[List[str]] = None
    nutrition: Optional[dict] = None
    scaling_factors: Optional[dict] = None
    version: Optional[int] = None

class RecipeInDB(RecipeBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class RecipeOut(RecipeBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        allow_population_by_field_name = True

# Create router
router = APIRouter(
    prefix="/api/recipes",
    tags=["recipes"],
    responses={404: {"description": "Not found"}},
)

# Get all recipes with optional filtering
@router.get("/", response_model=List[RecipeOut])
async def get_recipes(
    skip: int = 0, 
    limit: int = 10,
    search: Optional[str] = None,
    tags: Optional[List[str]] = Query(None),
    chef_id: Optional[str] = None,
    cuisine: Optional[str] = None
):
    query = {}
    
    # Apply filters if provided
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    if tags:
        query["tags"] = {"$in": tags}
    
    if chef_id:
        query["chef_id"] = chef_id
    
    if cuisine:
        query["cuisine"] = cuisine
    
    recipes = []
    for recipe in db.recipes.find(query).skip(skip).limit(limit).sort("created_at", pymongo.DESCENDING):
        recipes.append(recipe)
    
    return recipes

# Get a specific recipe by ID
@router.get("/{recipe_id}", response_model=RecipeOut)
async def get_recipe(recipe_id: str):
    if not ObjectId.is_valid(recipe_id):
        raise HTTPException(status_code=400, detail="Invalid recipe ID format")
    
    recipe = db.recipes.find_one({"_id": ObjectId(recipe_id)})
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    return recipe

# Create a new recipe
@router.post("/", response_model=RecipeOut, status_code=status.HTTP_201_CREATED)
async def create_recipe(recipe: RecipeCreate):
    recipe_dict = recipe.dict()
    recipe_dict["created_at"] = datetime.utcnow()
    recipe_dict["updated_at"] = recipe_dict["created_at"]
    
    result = db.recipes.insert_one(recipe_dict)
    created_recipe = db.recipes.find_one({"_id": result.inserted_id})
    
    return created_recipe

# Update a recipe
@router.put("/{recipe_id}", response_model=RecipeOut)
async def update_recipe(recipe_id: str, recipe_update: RecipeUpdate):
    if not ObjectId.is_valid(recipe_id):
        raise HTTPException(status_code=400, detail="Invalid recipe ID format")
    
    # Check if recipe exists
    recipe = db.recipes.find_one({"_id": ObjectId(recipe_id)})
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    # Update only provided fields
    update_data = {k: v for k, v in recipe_update.dict(exclude_unset=True).items() if v is not None}
    
    if update_data:
        update_data["updated_at"] = datetime.utcnow()
        
        # Increment version if not explicitly provided
        if "version" not in update_data:
            update_data["version"] = recipe.get("version", 1) + 1
        
        db.recipes.update_one(
            {"_id": ObjectId(recipe_id)},
            {"$set": update_data}
        )
    
    updated_recipe = db.recipes.find_one({"_id": ObjectId(recipe_id)})
    return updated_recipe

# Delete a recipe
@router.delete("/{recipe_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_recipe(recipe_id: str):
    if not ObjectId.is_valid(recipe_id):
        raise HTTPException(status_code=400, detail="Invalid recipe ID format")
    
    # Check if recipe exists
    recipe = db.recipes.find_one({"_id": ObjectId(recipe_id)})
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    db.recipes.delete_one({"_id": ObjectId(recipe_id)})
    return None

# Create a new version of a recipe
@router.post("/{recipe_id}/versions", response_model=RecipeOut)
async def create_recipe_version(recipe_id: str, recipe_update: RecipeUpdate):
    if not ObjectId.is_valid(recipe_id):
        raise HTTPException(status_code=400, detail="Invalid recipe ID format")
    
    # Check if recipe exists
    recipe = db.recipes.find_one({"_id": ObjectId(recipe_id)})
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    # Create a new recipe document based on the existing one
    new_recipe = recipe.copy()
    new_recipe.pop("_id")  # Remove the original ID
    
    # Update with the provided changes
    update_data = {k: v for k, v in recipe_update.dict(exclude_unset=True).items() if v is not None}
    new_recipe.update(update_data)
    
    # Set version and timestamps
    new_recipe["version"] = recipe.get("version", 1) + 1
    new_recipe["created_at"] = datetime.utcnow()
    new_recipe["updated_at"] = new_recipe["created_at"]
    
    # Insert as a new document
    result = db.recipes.insert_one(new_recipe)
    created_version = db.recipes.find_one({"_id": result.inserted_id})
    
    return created_version

# Get all versions of a recipe
@router.get("/{recipe_id}/versions", response_model=List[RecipeOut])
async def get_recipe_versions(recipe_id: str):
    if not ObjectId.is_valid(recipe_id):
        raise HTTPException(status_code=400, detail="Invalid recipe ID format")
    
    # Check if recipe exists
    recipe = db.recipes.find_one({"_id": ObjectId(recipe_id)})
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    
    # Find all recipes with the same title and chef_id
    versions = []
    for version in db.recipes.find({
        "title": recipe["title"],
        "chef_id": recipe["chef_id"]
    }).sort("version", pymongo.ASCENDING):
        versions.append(version)
    
    return versions
