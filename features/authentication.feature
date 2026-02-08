@authentication
Feature: SauceDemo Authentication
  As a user of SauceDemo
  I want to be able to log in and log out
  So that I can access the shopping platform securely

  Background:
    Given I am on the SauceDemo login page

  @smoke @login
  Scenario: Successful login with standard user
    When I enter "standard_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should be successfully logged in
    And I should see the products page
    And the page title should be "Swag Labs"
    And I should see "Products" heading
    And I should see "Sauce Labs Backpack" product

  @login @error-handling
  Scenario: Login attempt with locked out user
    When I enter "locked_out_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should see the error message "Epic sadface: Sorry, this user has been locked out."
    And I should remain on the login page
    And the username field should contain "locked_out_user"

  @login @error-handling
  Scenario: Login attempt with invalid credentials
    When I enter "invalid_user" as username
    And I enter "wrong_password" as password
    And I click the login button
    Then I should see the error message "Epic sadface: Username and password do not match any user in this service"
    And I should remain on the login page

  @login @validation
  Scenario: Login with empty credentials
    When I leave the username field empty
    And I leave the password field empty
    And I click the login button
    Then I should see an appropriate error message
    And I should remain on the login page

  @logout
  Scenario: Logout functionality
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I click the hamburger menu
    And I click the logout option
    Then I should be logged out successfully
    And I should be redirected to the login page
    And I should see the login form