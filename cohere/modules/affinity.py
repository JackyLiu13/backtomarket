from typing import Dict, Optional
from .base import BaseAPI
from urllib.parse import quote

# https://api-docs.affinity.co/#search-for-organizations


class AffinityAPI(BaseAPI):

    def __init__(self, api_key: str) -> None:
        super().__init__(api_key)
        self.base_url = "https://api.affinity.co"
        self.deals_list_id = "138487"
        self.list_entries = []
        self.get_all_list_entries()

    def get_request(self, url: str) -> Dict:
        response = self.session.get(url, auth=self.auth)
        return response.json()

    def post_request(self, url: str, data: Dict) -> Dict:
        response = self.session.post(url, auth=self.auth, data=data, headers={
                                     'Content-Type': 'application/json'})
        return response.json()
    
    def put_request(self, url: str, data: Dict) -> Dict:
        response = self.session.put(url, auth=self.auth, data=data, headers={
                                     'Content-Type': 'application/json'})
        return response.json()

    def search(
        self,
        person_name_search: Optional[str] = "",
        person_email_search: Optional[str] = "",
        organization_search: Optional[str] = "",
        opportunity_search: Optional[str] = ""
    ):
        """
        Take in any set of parameters and search through the affinity api for possible matches
        """
        results = {'person': {}, 'organization': {}}
        if person_name_search != "":
            results['person'] = {}
            person = self.search_person("?term=" + quote(person_name_search))
            if len(person['persons']) == 1:
                results['person'] = person['persons']
            elif len(person['persons']) == 0 and person_email_search != "":
                person = self.search_person("?term=" + quote(person_email_search))
                if len(person['persons']) >= 1:
                    results['person'] = person['persons'][0]
                else:
                    results['person'] = person['persons']
            # Multiple possible matches need to check email domain as well to see which might be right
            elif person_email_search != "" and len(person['persons']) > 1:
                _email_domain = person_email_search.strip().split(
                    '@')[-1].lower()
                _matches = list(filter(lambda x: str(x['primary_email']).split(
                    '@')[-1].lower() == _email_domain, person['persons']))
                # If only 1 match just use that
                if len(_matches) == 0:
                    results['person'] = person['persons'][0]
                # Otherwise use just the first match
                else:
                    results['person'] = _matches[0]
                    # Might want to raise some kind of exception or log this somehow
            else:
                results['person'] = person['persons'][0]
        if organization_search != "":
            results['organization'] = {}
            # remove inc, incorporated, co, company
            organization = self.search_organization(
                "?term=" + quote(organization_search))
            if len(organization['organizations']) == 1:
                results['organization'] = organization['organizations'][0]
            # Couldn't find with original input let's try to clean it up and try again
            elif len(organization['organizations']) == 0:
                clean_orgname = organization_search.lower()
                for replacer in [' inc.', ' inc', ' corp.', ' corp', ' corporation', ' incorporated', ' llc']:
                    clean_orgname = clean_orgname.replace(replacer, '')
                organization = self.search_organization(
                    "?term=" + quote(clean_orgname))
                # Check for how many matches. If 1 just use that if none then give up if multiple refine down
                if len(organization['organizations']) == 1:
                    results['organization'] = organization['organizations'][0]
                elif len(organization['organizations']) == 0:
                    results['organization'] = organization
                else:
                    # Check domain
                    if person_email_search != "":
                        _email_domain = person_email_search.strip().split(
                            '@')[-1].lower()
                        _matches = list(filter(lambda x: str(x['domain']).split(
                            '@')[-1].lower() == _email_domain, organization['organizations']))
                        if len(_matches) >= 1:
                            results['organization'] = _matches[0]
            else:
                # Check domain
                if person_email_search != "":
                    _email_domain = person_email_search.strip().split(
                        '@')[-1].lower()
                    _matches = list(filter(lambda x: str(x['domain']).split(
                        '@')[-1].lower() == _email_domain, organization['organizations']))
                    if len(_matches) >= 1:
                        results['organization'] = _matches[0]
        # Check if organization already in the list
        results['hasListEntry'] = self.check_organization_in_list(
            results['organization'])
        # Removing opportunity search we are not currently doing that today
        # if opportunity_search != "":
        #     results['opportunity'] = {}
        #     # remove inc, incorporated, co, company
        #     opportunity = self.search_opportunity(
        #         "?term=" + quote(opportunity_search))
        #     if len(opportunity['opportunities']) == 0:
        #         # TODO: SEARCH FOR THE OPPORTUNITY
        #         pass
        #     elif len(opportunity['opportunities'] == 1):
        #         results['opportunity'] = opportunity['opportunities'][0]
        #     else:
        #         # TODO: Filter for the right match when multiple exist
        #         results['opportunity'] = opportunity['opportunities'][0]
        return results

    def search_person(self, search_term: str) -> Dict:
        url = f"{self.base_url}/persons" + search_term
        return self.get_request(url)

    def search_organization(self, search_term: str) -> Dict:
        url = f"{self.base_url}/organizations" + search_term
        return self.get_request(url)

    def get_organization(self, id: str) -> Dict:
        url = f"{self.base_url}/organizations/" + id
        return self.get_request(url)

    def get_all_list_entries(self):
        """
        Get a list of objects representing the list entries that we have so far. 
        This will be useful to determin which organizations we are already tracking in our Deals list
        """
        url = f"https://api.affinity.co/lists/{self.deals_list_id}/list-entries"
        self.list_entries = self.get_request(url)
        return self.list_entries

    def check_organization_in_list(self, organization) -> bool:
        if type(organization) == list:
            print(organization)
        if len(organization) == 0:
            return False
        elif 'organizations' in organization.keys():
            return False
        else:
            if 'id' not in organization.keys():
                print(organization)
            _check = list(
                filter(lambda x: x['entity']['id'] == organization['id'], self.list_entries))
            return len(_check) == 1

    def search_opportunity(self, search_term: str) -> Dict:
        """
        Search through the list of opportunities in Affinity.

        Currently we are not using opportunities so this is not needed.
        """
        url = f"{self.base_url}/opportunities" + search_term
        return self.get_request(url)

    def get_opportunity(self, id: str) -> Dict:
        url = f"{self.base_url}/opportunities/" + id
        return self.get_request(url)

    def create_person(self, data: Dict) -> Dict:
        # data {"first_name": "Alice", "last_name": "Doe", "emails": ["alice@affinity.co"], "organization_ids": [1687449]}
        url = "https://api.affinity.co/persons"
        return self.post_request(url, data)

    def create_opportunity(self, data: Dict) -> Dict:
        """
        We arent actually using opportunities right now. 
        Instead just using organizations and adding them to lists
        """
        # data = {"name": "Penny Opportunity", "list_id": 6645, "person_ids": [38706], "organization_ids": [21442]}
        url = "https://api.affinity.co/opportunities"
        return self.post_request(url, data)

    def add_organization_to_list(self, data: Dict, list_id: Optional[str] = "") -> Dict:
        """
        Add the organization id to the specific list

        entity_id corresponds to the organization id that will be added to the list
        """
        # data = {'entity_id': 4578915}
        list_id = list_id if list_id != "" else self.deals_list_id
        url = f"https://api.affinity.co/lists/{list_id}/list-entries"
        return self.post_request(url, data)

    def get_list_entry_field_values(self, list_entry_id: str) -> Dict:
        url = f"https://api.affinity.co/field-values?list_entry_id={list_entry_id}"
        return self.get_request(url)

    def update_field_value(self, id: str, data: Dict) -> Dict:
        url = f"https://api.affinity.co/field-values/{id}"
        # data = {"value": value}
        return self.put_request(url, data)

    def create_new_field_value(self, data: Dict) -> Dict:
        # data = {"field_id": 1284, "value": "Architecture", "entity_id": 38706}
        # entity_id = organization_id
        url = f"https://api.affinity.co/field-values"
        return self.post_request(url, data)

    def create_organization(self, data: Dict) -> Dict:
        # data = {"name": "Acme Corporation", "domain": "acme.co", "person_ids": [38706]}
        url = "https://api.affinity.co/organizations"
        return self.post_request(url, data)

    def create_note(self, data: Dict) -> Dict:
        # data = {"organization_ids": [], "content": "This is my content"}
        url = "https://api.affinity.co/notes"
        return self.post_request(url, data)
    
    def read_notes_by_org(self,id:int) -> Dict:
        url = f"https://api.affinity.co/notes?organization_id={id}"
        notes = self.get_request(url)
        return notes
