import cohere
import time

API_KEY = "eQsELk9xHfwh99gme2t2H03TgutvC0auWv77P8os"

def generate_suggestions(country, product, haggle):
    co = cohere.Client(API_KEY)
    prompt = f"you are traveler that is exploring the a local market in {country}. You come across a {product} that you want to buy but the haggler is giving you a hard time for prices. Come up with potential responses that are going to be aggressive to ask the haggler to get a lower price, the responses should be in the format of a json with the key suggestions. Give rough suggested responses in english as the haggler loves to haggle. The haggler is asking: {haggle}. An example of the json will be ```json{{\"suggestions\": [\"{{suggestion1}}\",\"{{suggestion2}}\"]}}```"   
    print(prompt)
    generate = co.chat(
        model="command-nightly",
        message=prompt,
        temperature=0,
    )
    return generate.text

def generate_prices(country,product,price):
    co = cohere.Client("eQsELk9xHfwh99gme2t2H03TgutvC0auWv77P8os")
    # country = "china"
    # product = "hoodie"
    # price = "260"
    prompt = """i am in {country} and i am trying to buy a singular {product} at a street market as an average consumer. The seller is trying to sell for {price} of {country}'s currency which is too high. Suggest me only values of fair prices in {country}'s currency with keys of low, medium, high of {country} and also provide some negotiation tips as just a paragraph. produce a singular json with keys prices and negotiation suggestions as a string, for example ```json{{"prices": {{"low": "","medium":"","high":""}},"negotiation_tips": ""}}``` """
    prompt = prompt.format(country=country, product=product, price=price)
    
    generate = co.chat(
        model="command-nightly",
        message=prompt,	
        temperature=0

    )
    return generate.text

def test_content():
    co = cohere.Client("eQsELk9xHfwh99gme2t2H03TgutvC0auWv77P8os")
    documents = [{"title": "Sweatshirt prices", "snippet": "Sweatshirt prices"}]
    country = "china"
    product = "hoodie"
    price = "260"
    prompt = """i am in {country} and i am trying to buy a singular {product} at a street market as an average consumer. The seller is trying to sell for {price} of {country}'s currency which is too high. Suggest me only values of fair prices in {country}'s currency with keys of low, medium, high of {country} and also provide some negotiation tips as just a paragraph. produce a singular json with keys prices and negotiation suggestions as a string, for example ```json{{"prices": {{"low": "","medium":"","high":""}},"negotiation_tips": ""}}``` """
    prompt = prompt.format(country=country, product=product, price=price)
    # prompt = "我在中国深圳，想在街头市场买一件连帽衫，但卖家想以 240 元人民币的价格出售，这个价格太高了。 向我推荐一些中国的公平价格，并提供一些谈判技巧. produce a json with keys price and negogiation suggestions"
    
    # documents = [{"title": "Topic", "snippet": "spotted orange dogs from toronto bark at 12am"}]
    # prompt="based on the document what kind of dogs barks at 12am?"

    #get start time
    start = time.time()
    generate = co.chat(
        model="command-nightly",
        message=prompt,	
        temperature=0
        # ,
        # documents=documents
        # ,
        # connectors=[{"id": "web-search"}]  

    )
    #get end time
    end = time.time() - start
    print("Time taken to generate content: ", end)
    return generate.text



def testSuggestions():
    co = cohere.Client("eQsELk9xHfwh99gme2t2H03TgutvC0auWv77P8os")
    haggle = "my friend 200 good price"
    country = "china"
    product ="hoodie"
    prompt = f"you are traveler that is exploring the a local market in {country}. You come across a {product} that you want to buy but the haggler is giving you a hard time for prices. Come up with potential responses that are going to be aggressive to ask the haggler to get a lower price, the responses should be in the format of a json with the key suggestions. Give rough suggested responses as the haggler loves to haggle. The haggler is asking: {haggle}. An example of the json will be ```json{{\"suggestions\": [\"{{suggestion1}}\",\"{{suggestion2}}\"]}}```"   
    print(prompt)
    generate = co.chat(
        model="command-nightly",
        message=prompt,
        temperature=0,
    )
    return generate.text