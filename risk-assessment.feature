Feature: Risk Assessment API

  Scenario: Submitting a valid risk assessment request returns an accepted status
    Given a valid customer risk assessment payload
    When I submit the risk assessment request
    Then the response status code should be 202
    And a risk assessment record should be created in DynamoDB