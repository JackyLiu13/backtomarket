from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

from pydantic import BaseModel
import cohelp
import re
import json

app = FastAPI()


class Item(BaseModel):
    country: str
    product: str
    price: float

class ProductInfo(BaseModel):
    country: str
    product: str
    haggle: str

@app.get("/")
async def root():
    return {"Hello": "World!"}

@app.post("/prices")
async def generate_prices(item: Item):
    country = item.country
    product = item.product
    price = item.price
    output = cohelp.generate_prices(country=country, product=product, price=price)
    # Extract JSON string from output
    json_str = re.search(r'```json\n(.*?)\n```', output, re.DOTALL)
    if json_str:
        json_str = json_str.group(1)
        # Parse JSON string to Python dict
        json_data = json.loads(json_str)
    else:
        json_data = None
    return {"json_data": json_data}


@app.post("/suggestions")
async def generate_suggestions(product_info: ProductInfo):
    country = product_info.country
    product = product_info.product
    haggle = product_info.haggle
    suggestions = cohelp.generate_suggestions(country=country, product=product, haggle=haggle)
    # Extract JSON string from suggestions
    json_str = re.search(r'```json\n(.*?)\n```', suggestions, re.DOTALL)
    if json_str:
        json_str = json_str.group(1)
        # Parse JSON string to Python dict
        json_data = json.loads(json_str)
    else:
        json_data = None
    return {"suggestions": suggestions, "json_data": json_data}



@app.get("/testContent")
async def get_cohelp_content():
    output = cohelp.test_content()
    # Extract JSON string from output
    json_str = re.search(r'```json\n(.*?)\n```', output, re.DOTALL)
    if json_str:
        json_str = json_str.group(1)
        # Parse JSON string to Python dict
        json_data = json.loads(json_str)
    else:
        json_data = None
    return {"content": output, "json_data": json_data}


@app.get("/testSuggestions")
async def get_suggestions():
    output = cohelp.testSuggestions()
    # Extract JSON string from output
    json_str = re.search(r'```json\n(.*?)\n```', output, re.DOTALL)
    if json_str:
        json_str = json_str.group(1)
        # Parse JSON string to Python dict
        json_data = json.loads(json_str)
    else:
        json_data = None
    return {"content": output, "json_data": json_data}
