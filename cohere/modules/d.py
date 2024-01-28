from typing import Dict, Optional
from .base import BaseAPI
from urllib.parse import quote


class dee(BaseAPI):

    def __init__(self, api_key: str) -> None:
        super().__init__(api_key)
        self.base_url = "https://api.affinity.co"
        self.deals_list_id = "138487"
        self.list_entries = []

    def get_request(self, url: str) -> Dict:
        response = self.session.get(url, auth=self.auth)
        return response.json()

    def get_deals(self) -> Dict:
        url = f"{self.base_url}/api/v1/lists/{self.deals_list_id}/entries"
        response = self.get_request(url)
        return response