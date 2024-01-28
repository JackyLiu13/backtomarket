from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import cohelp
import re
import json

app = FastAPI()

@app.get("/")
async def root():
    return {"Hello": "World!"}



@app.get("/cohelp")
async def get_cohelp_content():
    output = cohelp.generate_content()
    # Extract JSON string from output
    json_str = re.search(r'```json\n(.*?)\n```', output, re.DOTALL)
    if json_str:
        json_str = json_str.group(1)
        # Parse JSON string to Python dict
        json_data = json.loads(json_str)
    else:
        json_data = None
    return {"content": output, "json_data": json_data}


@app.get("/suggestions")
async def get_suggestions():
    output = cohelp.generate_suggestions()
    # Extract JSON string from output
    json_str = re.search(r'```json\n(.*?)\n```', output, re.DOTALL)
    if json_str:
        json_str = json_str.group(1)
        # Parse JSON string to Python dict
        json_data = json.loads(json_str)
    else:
        json_data = None
    return {"content": output, "json_data": json_data}