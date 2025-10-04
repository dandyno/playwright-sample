@user_checkout
Feature: User Checkout Flow

    Scenario Outline: full checkout flow
        Given user is logged in on store page
        When the user add item to cart
        Then user verify badge cart added
        Given user on cart page
        When user click remove item from cart
        Then badge should decrease
        Given user continue checkout
        When user input checkout information "John", "Doe", "10011" and click checkout
        Then user finish checkout order
        Then user see confirmation order 


    Scenario Outline: failed checkout flow
        Given user is logged in on store page
        When the user add item to cart
        Then user verify badge cart added
        Given user on cart page
        Given user continue checkout
        When missing checkout information and click checkout
        Then user see error message "Error: First Name is required"

    


