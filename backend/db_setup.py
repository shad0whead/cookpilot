import os
from pymongo import MongoClient
from bson import ObjectId
from dotenv import load_dotenv
import urllib.parse

# Load environment variables
load_dotenv()

# MongoDB connection with properly encoded credentials
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# Parse and properly encode the credentials
if "mongodb+srv://" in MONGO_URI:
    parts = MONGO_URI.split("@")
    if len(parts) > 1:
        auth_part = parts[0].replace("mongodb+srv://", "")
        if ":" in auth_part:
            username, password = auth_part.split(":", 1)
            encoded_username = urllib.parse.quote_plus(username)
            encoded_password = urllib.parse.quote_plus(password)
            MONGO_URI = f"mongodb+srv://{encoded_username}:{encoded_password}@{parts[1]}"

try:
    client = MongoClient(MONGO_URI)
    db = client.cookpilot_db
    print("Successfully connected to MongoDB Atlas!")
    
    # Create collections with validation schemas
    def setup_database():
        try:
            # Users collection schema
            db.command({
                'create': 'users',
                'validator': {
                    '$jsonSchema': {
                        'bsonType': 'object',
                        'required': ['email', 'role', 'created_at'],
                        'properties': {
                            'email': {
                                'bsonType': 'string',
                                'description': 'Email address of the user'
                            },
                            'name': {
                                'bsonType': 'string',
                                'description': 'Full name of the user'
                            },
                            'role': {
                                'enum': ['admin', 'chef', 'client', 'viewer'],
                                'description': 'Role of the user'
                            },
                            'created_at': {
                                'bsonType': 'date',
                                'description': 'Date when the user was created'
                            },
                            'updated_at': {
                                'bsonType': 'date',
                                'description': 'Date when the user was last updated'
                            },
                            'preferences': {
                                'bsonType': 'object',
                                'description': 'User preferences'
                            }
                        }
                    }
                }
            })
            print("Created users collection with schema validation")

            # Recipes collection schema
            db.command({
                'create': 'recipes',
                'validator': {
                    '$jsonSchema': {
                        'bsonType': 'object',
                        'required': ['title', 'chef_id', 'ingredients', 'steps', 'created_at', 'version'],
                        'properties': {
                            'title': {
                                'bsonType': 'string',
                                'description': 'Title of the recipe'
                            },
                            'chef_id': {
                                'bsonType': 'string',
                                'description': 'ID of the chef who created the recipe'
                            },
                            'description': {
                                'bsonType': 'string',
                                'description': 'Description of the recipe'
                            },
                            'ingredients': {
                                'bsonType': 'array',
                                'description': 'List of ingredients',
                                'items': {
                                    'bsonType': 'object',
                                    'required': ['name', 'quantity', 'unit'],
                                    'properties': {
                                        'name': {
                                            'bsonType': 'string',
                                            'description': 'Name of the ingredient'
                                        },
                                        'quantity': {
                                            'bsonType': 'double',
                                            'description': 'Quantity of the ingredient'
                                        },
                                        'unit': {
                                            'bsonType': 'string',
                                            'description': 'Unit of measurement'
                                        },
                                        'notes': {
                                            'bsonType': 'string',
                                            'description': 'Additional notes about the ingredient'
                                        }
                                    }
                                }
                            },
                            'steps': {
                                'bsonType': 'array',
                                'description': 'List of steps',
                                'items': {
                                    'bsonType': 'object',
                                    'required': ['order', 'description'],
                                    'properties': {
                                        'order': {
                                            'bsonType': 'int',
                                            'description': 'Order of the step'
                                        },
                                        'description': {
                                            'bsonType': 'string',
                                            'description': 'Description of the step'
                                        },
                                        'time': {
                                            'bsonType': 'int',
                                            'description': 'Time in minutes for this step'
                                        },
                                        'temperature': {
                                            'bsonType': 'object',
                                            'properties': {
                                                'value': {
                                                    'bsonType': 'int',
                                                    'description': 'Temperature value'
                                                },
                                                'unit': {
                                                    'enum': ['C', 'F'],
                                                    'description': 'Temperature unit (Celsius or Fahrenheit)'
                                                }
                                            }
                                        },
                                        'media': {
                                            'bsonType': 'array',
                                            'items': {
                                                'bsonType': 'string',
                                                'description': 'URL to media file'
                                            }
                                        }
                                    }
                                }
                            },
                            'tags': {
                                'bsonType': 'array',
                                'items': {
                                    'bsonType': 'string'
                                },
                                'description': 'Tags for the recipe'
                            },
                            'cuisine': {
                                'bsonType': 'string',
                                'description': 'Cuisine type'
                            },
                            'prep_time': {
                                'bsonType': 'int',
                                'description': 'Preparation time in minutes'
                            },
                            'cook_time': {
                                'bsonType': 'int',
                                'description': 'Cooking time in minutes'
                            },
                            'servings': {
                                'bsonType': 'int',
                                'description': 'Number of servings'
                            },
                            'media': {
                                'bsonType': 'array',
                                'items': {
                                    'bsonType': 'string',
                                    'description': 'URL to media file'
                                }
                            },
                            'nutrition': {
                                'bsonType': 'object',
                                'properties': {
                                    'calories': {
                                        'bsonType': 'int',
                                        'description': 'Calories per serving'
                                    },
                                    'protein': {
                                        'bsonType': 'double',
                                        'description': 'Protein in grams'
                                    },
                                    'carbs': {
                                        'bsonType': 'double',
                                        'description': 'Carbohydrates in grams'
                                    },
                                    'fat': {
                                        'bsonType': 'double',
                                        'description': 'Fat in grams'
                                    },
                                    'fiber': {
                                        'bsonType': 'double',
                                        'description': 'Fiber in grams'
                                    },
                                    'sugar': {
                                        'bsonType': 'double',
                                        'description': 'Sugar in grams'
                                    }
                                }
                            },
                            'scaling_factors': {
                                'bsonType': 'object',
                                'properties': {
                                    'shrinkage': {
                                        'bsonType': 'double',
                                        'description': 'Shrinkage factor for scaling'
                                    },
                                    'waste': {
                                        'bsonType': 'double',
                                        'description': 'Waste factor for scaling'
                                    },
                                    'time_adjustment': {
                                        'bsonType': 'double',
                                        'description': 'Time adjustment factor for scaling'
                                    }
                                }
                            },
                            'version': {
                                'bsonType': 'int',
                                'description': 'Version number of the recipe'
                            },
                            'created_at': {
                                'bsonType': 'date',
                                'description': 'Date when the recipe was created'
                            },
                            'updated_at': {
                                'bsonType': 'date',
                                'description': 'Date when the recipe was last updated'
                            }
                        }
                    }
                }
            })
            print("Created recipes collection with schema validation")

            # Notes collection schema
            db.command({
                'create': 'notes',
                'validator': {
                    '$jsonSchema': {
                        'bsonType': 'object',
                        'required': ['recipe_id', 'user_id', 'content', 'created_at'],
                        'properties': {
                            'recipe_id': {
                                'bsonType': 'string',
                                'description': 'ID of the recipe'
                            },
                            'user_id': {
                                'bsonType': 'string',
                                'description': 'ID of the user who created the note'
                            },
                            'content': {
                                'bsonType': 'string',
                                'description': 'Content of the note'
                            },
                            'created_at': {
                                'bsonType': 'date',
                                'description': 'Date when the note was created'
                            },
                            'updated_at': {
                                'bsonType': 'date',
                                'description': 'Date when the note was last updated'
                            }
                        }
                    }
                }
            })
            print("Created notes collection with schema validation")

            print("Database setup completed successfully!")
            return True
        except Exception as e:
            print(f"Error setting up database: {str(e)}")
            return False

    # Run the setup function
    if __name__ == "__main__":
        setup_database()

except Exception as e:
    print(f"Error connecting to MongoDB: {str(e)}")
