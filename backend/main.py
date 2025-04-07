from fastapi import FastAPI
from routers import auth, recipes, search

app = FastAPI()

app.include_router(auth.router, prefix="/api/auth")
app.include_router(recipes.router, prefix="/api/recipes")
app.include_router(search.router, prefix="/api/search")
