from typing import Collection
from selenium import webdriver
from selenium.webdriver.common.by import By

from unittest import skip
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver import Chrome, ChromeOptions
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium_stealth import stealth
import time


def find_link(url):
    # options = webdriver.ChromeOptions()
    # options.add_experimental_option("excludeSwitches", ["enable-automation"])
    # options.add_experimental_option("useAutomationExtension", False)
    # options.add_argument("--headless")
    browser = webdriver.Chrome()
    browser.implicitly_wait(5)
    stealth(
        browser,
        user_agent="DN",
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True,
    )
    # browser.set_page_load_timeout(30)
    try:
        browser.get("https://period-pejai-deploy.vercel.app/")
        browser.implicitly_wait(30)
        login_button = "/html/body/div/div/div/div[2]/div[3]/div[2]/button"
        browser.find_element(By.XPATH, login_button).click()
        browser.implicitly_wait(30)
        browser.get("https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&client_id=1068916256161-3agldmmqcjlbp525aua5751tdue4uf3h.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fperiod-pejai.firebaseapp.com%2F__%2Fauth%2Fhandler&state=AMbdmDlvzgyBzSZQqHDP6ymZnrmOYpnuGj27duK6ZELnC6thc90Gl-Rz3bkWRBNYE9D7jV347Ifq6Hifqb4b5_J4xATnH7tWar4ODBee5UfKnHz0DqxTym6adIptu6v1prYZ7FlOVaJ8i2ycQAEGn1AJG8CIkyiEbr3CCrNzlopIsAZOzmOmItU5DRS82nf8GTaYAltDUXbTsGB9YujAP4KsrB9c2h66ieu_Ol5XcGht6wvNIL3TTr71VmbxiImELX5Dp-2qBCto81Z7QjOTewmfF7cU-c2jTvW4eqNau1BjpMqe9eiimxo7QodSxanO9D5d28ZuhQ&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20profile&prompt=select_account&context_uri=https%3A%2F%2Fperiod-pejai-deploy.vercel.app&service=lso&o2v=1&flowName=GeneralOAuthFlow")
        browser.implicitly_wait(90)
        find_email = "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div/div[1]/div/div[1]/input"
        browser.find_element(By.XPATH, find_email).send_keys('junesix04@gmail.com')
        browser.implicitly_wait(90)
        browser.implicitly_wait(30)
        next = "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/div/button"
        browser.find_element(By.XPATH, next).click()
        browser.implicitly_wait(30)
        
        find_password = "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div[1]/div[1]/div/div/div/div/div[1]/div/div[1]/input"
        browser.find_element(By.XPATH, find_password).send_keys('wanten690')
        browser.implicitly_wait(30)
        
        #submit password
        next_pass = "/html/body/div[1]/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div[2]/div/div[1]/div/div/button"
        browser.find_element(By.XPATH, next_pass).click()
        browser.implicitly_wait(30)

        # click birth year input
        browser.find_element(By.XPATH, "/html/body/div/div/div/form/div/div/span[1]/input").click()
        browser.find_element(By.XPATH, "/html/body/div/div/div/form/div/div/span[1]/input").send_keys(2002)
        # click period length input
        browser.find_element(By.XPATH, "/html/body/div/div/div/form/div/div/span[2]/input").click()
        browser.find_element(By.XPATH, "/html/body/div/div/div/form/div/div/span[2]/input").send_keys(7)
        # click cycle length input
        browser.find_element(By.XPATH, "/html/body/div/div/div/form/div/div/span[3]/input").click()
        browser.find_element(By.XPATH, "/html/body/div/div/div/form/div/div/span[3]/input").send_keys(28)
        # click luteal input
        browser.find_element(By.XPATH, "/html/body/div/div/div/form/div/div/span[4]/input").click()
        browser.find_element(By.XPATH, "/html/body/div/div/div/form/div/div/span[4]/input").send_keys(14)
        # click save information button
        browser.find_element(By.XPATH, "/html/body/div/div/div/form/div/div/button").click()
        # click ok on pop up
        browser.find_element(By.XPATH, "/html/body/div[2]/div/div[6]/button[1]").click()
        # click on date picker
        browser.find_element(By.XPATH, "/html/body/div[1]/div/div/form/div/div/div/div/div[1]/input").click()
        # select start date of date range
        browser.find_element(By.XPATH,
                                  "/html/body/div[2]/div/div/div/div[2]/div/div[1]/div/div[2]/table/tbody/tr[1]/td[3]/div").click()
        # select stop date of date range
        browser.find_element(By.XPATH,
                                  "/html/body/div[2]/div/div/div/div[2]/div/div[1]/div/div[2]/table/tbody/tr[2]/td[2]/div").click()
        # click to save the date range
        browser.find_element(By.XPATH,
                                  "/html/body/div[1]/div/div/form/div/div/button[2]").click()
        # Test homepage
        # redirect to homepage
        browser.find_element(By.XPATH,
                                  "/html/body/div[1]/div/div/div/span[2]/button/p").click()
        # click on date picker
        browser.find_element(By.XPATH,
                                  "/html/body/div[1]/div/div/div[1]/div[2]/div/div[1]/input").click()
        # select start date of current period range
        browser.find_element(By.XPATH,
                                  "/html/body/div[2]/div/div/div/div[2]/div/div[1]/div/div[2]/table/tbody/tr[5]/td[3]/div").click()
        # select stop date of current period range
        browser.find_element(By.XPATH,
                                  "/html/body/div[2]/div/div/div/div[2]/div/div[1]/div/div[2]/table/tbody/tr[6]/td[2]/div").click()
        # click on save button
        browser.find_element(By.XPATH,
                                  "/html/body/div[1]/div/div/div[1]/button").click()
        # click on slider bar
        browser.find_element(By.XPATH,
                                  "/html/body/div[1]/div/div/div[2]/div[2]/div/div[4]").click()
        # click on blood level
        browser.find_element(By.XPATH,
                                  "/html/body/div/div/div/div[2]/div[4]/div[2]/button/img[1]").click()
        # click on diary text
        browser.find_element(By.XPATH,
                                  "/html/body/div/div/div/div[2]/div[4]/div[2]/button/img[1]").click()
        browser.find_element(By.XPATH, "/html/body/div/div/div/div[2]/textarea").send_keys(
            "Test, This is my diary.")
        # save all right side components
        browser.find_element(By.XPATH,
                                  "/html/body/div/div/div/div[2]/button").click()
        # logout from the website
        browser.find_element(By.XPATH,
                                  "/html/body/div/div/div/span/button/p").click()


        # sign_in_path = "/html/body/div/div/div/div[2]/div[3]/div[2]/button"
        # elem1 = browser.find_element(By.XPATH, sign_in_path)
        return "suc"
    except ValueError:
        print('Url is not valid.')

url = find_link("https://period-pejai-deploy.vercel.app/")
print(url)