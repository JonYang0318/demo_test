import allure
import pytest
from api.clients.reqres_client import ReqresClient

@pytest.mark.regression
@allure.feature("User API")
@allure.story("Create User")
@allure.title("Verify create user")
def test_create_user():


    client = ReqresClient()

    with allure.step("準備好建立資料"):
        payload = {

            "name": "Jimmy",

            "job": "QA Engineer"

        }

    with allure.step("send request"):
        response = client.create_user(payload)


        assert response.status_code == 201


        body = response.json()

    with allure.step("vertify create data"):
        assert body["name"] == "Jimmy"

        assert body["job"] == "QA Engineer"

        assert "id" in body

        assert "createdAt" in body