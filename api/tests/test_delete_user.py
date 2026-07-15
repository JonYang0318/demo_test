import allure
import pytest
from api.clients.reqres_client import ReqresClient


@pytest.mark.regression
@allure.feature("User API")
@allure.story("Delete User")
@allure.title("Verify delete user")
def test_delete_user():


    client = ReqresClient()


    response = client.delete_user(2)


    assert response.status_code == 204