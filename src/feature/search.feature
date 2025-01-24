Feature: Validate Search Functionality on Udacity Catalog
  Background:
    Given the application is loaded successfully

  Scenario: User performs a search and sees relevant results
    Given the user searches for "JavaScript"
    Then the user sees results matching the search term in the UI
    And the user fetches search results from the API
    And the UI results should match the API results

  Scenario: User searches using the "Skill" dropdown
    Given the user clicks on the "Skill" dropdown
    When the user searches for "Python" in the Skill dropdown
    Then the user sees results matching the search term in the UI
    And the user fetches search results from the API
    And the UI results should match the API results

  Scenario: No results found for a search term
    Given the user searches for "NonExistentCourse"
    Then the user should see a "No results found" message

