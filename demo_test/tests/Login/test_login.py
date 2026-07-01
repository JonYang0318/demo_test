from pages.auth.login_page import LoginPage


def test_login_success(page):

    login = LoginPage(page)

    login.open()

    login.login(
        "standard_user",
        "secret_sauce"
    )

    assert "inventory" in page.url

def test_login_fail(page):

    login = LoginPage(page)

    login.open()

    login.login(
        "standard_user",
        "wrongpassword"
    )

    error = page.locator(
        "[data-test='error']"
    )

    assert error.is_visible()