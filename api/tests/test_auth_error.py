import allure
import requests
import pytest
from api.clients.reqres_client import ReqresClient

@pytest.mark.regression
@allure.feature("Authentication API")
@allure.story("request error with out api ")
@allure.title("Verify staus code  401")
def test_without_api_key():

    response = requests.get(
        "https://reqres.in/api/users/2"
    )

    assert response.status_code == 401