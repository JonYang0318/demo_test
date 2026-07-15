import allure
import pytest
from api.clients.auth_client import AuthClient


@pytest.mark.regression
@allure.feature("Authentication API")
@allure.story("Login Success")
@allure.title("Verify login API returns token")
def test_login_success():


    client = AuthClient()

    with allure.step("準備登入資料"):
        payload = {

            "email": "eve.holt@reqres.in",

            "password": "cityslicka"

        }

    with allure.step("request 資料"):
     response = client.login(payload)

    with allure.step("Verify status code"):
     assert response.status_code == 200


    body = response.json()

    with allure.step("Verify status code"):
        assert "token" in body

        assert body["token"] is not None


@pytest.mark.regression
@allure.feature("Authentication API")
@allure.story("Login Failed")
@allure.title("Verify login API returns error when password missing")
def test_login_failed():


    client = AuthClient()

    with allure.step("準備登入資料"):
        payload = {

            "email": "peter@klaven"

        }

    with allure.step("Send login request"):
     response = client.login(payload)

    with allure.step("Verify status code"):
     assert response.status_code == 400


    body = response.json()

    with allure.step("Verify error message"):
     assert body["error"] == "Missing password"