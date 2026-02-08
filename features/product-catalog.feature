@product-catalog
Feature: SauceDemo Product Catalog
  As a customer
  I want to browse and interact with the product catalog
  So that I can find and purchase items

  Background:
    Given I am logged in as "standard_user" with password "secret_sauce"

  @smoke @catalog
  Scenario: View product catalog
    Then I should see the products page
    And I should see at least 6 products displayed
    And each product should have a name, image, price, and add to cart button

  @catalog @sorting
  Scenario Outline: Sort products by different criteria
    When I select "<sort_option>" from the sort dropdown
    Then the products should be sorted by "<expected_order>"

    Examples:
      | sort_option | expected_order |
      | Name (A to Z) | alphabetical_ascending |
      | Name (Z to A) | alphabetical_descending |
      | Price (low to high) | price_ascending |
      | Price (high to low) | price_descending |

  @catalog @product-details
  Scenario: View individual product details
    When I click on "Sauce Labs Backpack" product name
    Then I should see the product details page
    And I should see the product name "Sauce Labs Backpack"
    And I should see the product description
    And I should see the product price "$29.99"
    And I should see the "Add to cart" button
    And I should see the "Back to products" button

  @shopping-cart
  Scenario: Add product to cart
    When I click "Add to cart" for "Sauce Labs Backpack"
    Then the button text should change to "Remove"
    And the shopping cart badge should show "1"
    
  @shopping-cart
  Scenario: Remove product from cart
    Given I have added "Sauce Labs Backpack" to the cart
    When I click "Remove" for "Sauce Labs Backpack"
    Then the button text should change to "Add to cart"
    And the shopping cart badge should not be visible