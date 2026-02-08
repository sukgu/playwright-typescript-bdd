@offline-demo
Feature: Local HTML Testing
  As a developer
  I want to test basic browser functionality
  So that I can verify my BDD setup works without external dependencies

  @smoke @local
  Scenario: Create and test a simple HTML page
    Given I create a simple HTML page with title "BDD Test Page"
    When I navigate to the local HTML page
    Then the page title should be "BDD Test Page"
    And I should see the heading "Welcome to BDD Testing"