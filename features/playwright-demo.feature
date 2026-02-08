@playwright-demo
Feature: Playwright Website Navigation
  As a developer
  I want to navigate through the Playwright documentation
  So that I can learn about the framework

  @smoke
  Scenario: Verify Playwright website title
    Given I am on the Playwright website
    Then the page title should contain "Playwright"

  @navigation
  Scenario: Navigate to Get Started page
    Given I am on the Playwright website
    When I click on the "Get started" link
    Then I should see the "Installation" heading