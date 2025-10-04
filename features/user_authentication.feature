@user_authentication
Feature: User Authentication

    Scenario Outline: user succesful login and logout
        Given user navigate to login page
        When the user enters credentials "standard_user", "secret_sauce" and click login
        Then user should see store page
        Given user on store page
        When the user click sidemenu and logout
        Then user will log out and see login page

    Scenario Outline: login with invalid credentials
        When the user enters credentials "abcd", "abcd" and click login
        Then user should see error msg

    