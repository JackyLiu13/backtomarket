from requests import session

class BaseAPI:
    #bearer tokens :/
    def __init__(self, api_key: str) -> None:
        self.session = session()
        self.headers = {"Authorization": f"Bearer {api_key}"}
        self.auth = ('', api_key)
