API Architecture
The Vehicle Databases API follows a RESTful architecture and employs secure HTTPS for communication. Its endpoints are designed with intuitive, resource-oriented URLs. It accepts request data in JSON format, and its responses are also formatted in JSON. The API adheres to standard HTTP response codes, employs authentication mechanisms, and utilizes standard HTTP verbs for interaction.

Base URL
The documentation references all API endpoint URLs with a common base: https://api.vehicledatabases.com

Authorization Key
To access the API, an authentication key is required. This key is provided upon signup or package purchase, ensuring secure and authorized access to the API's features.

Request Type and HTTP Response Status Codes
Request Type

All requests and responses made to Vehicle Databases follow the application/json content type standard. This ensures a consistent and structured approach to data exchange between your application and our API.

GET request is designed to retrieve comprehensive information about an account object without causing any modifications or alterations to the account itself. This request is purely for data retrieval.

POST serves as a mechanism for sending a data object to the Vehicle Databases server, enabling the execution of a predefined operation. By utilizing this request, you can provide the necessary data input to trigger specific actions or processes within the system.

HTTP Response Status Codes

Vehicle Databases uses standard HTTP response status codes to convey the outcome of your requests. These status codes help you understand the success or failure of your API interactions. Below is a summary of the most common status codes you may encounter:

Status Type	Description
200	Successful Request
400	Bad Request – Invalid request format
401	Unauthorized – Invalid API Key
402	Request Failed
403	Forbidden – You do not have access to the requested resource
404	Not Found
409	Conflict
429	Too Many Requests
500, 502, 503, 504	Internal Server Error

Responses
At Vehicle Databases, we maintain a consistent response format to ensure clarity and ease of integration. All responses from our APIs are delivered in the JSON format, and they are encoded in UTF-8.

It's important to note that the structure of the response body may vary depending on the specific endpoint you're interacting with. To provide you with the most relevant and precise information, we have described the response structure for each endpoint separately in our documentation.

Postman Collection
We've prepared a Postman collection for Vehicle Databases to simplify the process of testing and integrating with our APIs. This collection includes a set of pre-configured API requests, along with detailed descriptions and sample responses. Using Postman and our collection, you can quickly explore our API endpoints, test functionality, and jump-start your integration process.

What's Included?

Pre-configured Requests: The collection contains pre-configured requests for different aspects of Vehicle Databases, such as VIN decoding, auction data retrieval, sales history, and more.

Request Descriptions: Each request in the collection is accompanied by detailed descriptions and the required parameters.

Authorization Setup: We've set up the necessary authorization parameters for you, making it easy to get started with your API key.

How to Get the Postman Collection

To access and download the Vehicle Databases Postman collection, simply click on the link below:

Download Vehicle Databases Postman Collection

Getting Started with Postman

If you're new to Postman, you can download and install the Postman application from the Postman website. It's a powerful tool for API development and testing, and our collection is designed to work seamlessly with it.

Once you have Postman installed, import the downloaded collection to start exploring and testing the Vehicle Databases APIs. If you encounter any issues or have questions, don't hesitate to reach out to our support team.

Happy testing and integrating with Vehicle Databases!

API Rate Limits
To ensure efficient use and fair distribution of resources, our platform implements API rate limiting. Rate limits are in place to maintain platform stability and to ensure fair access for all users.

Rate Limit Overview
Strict Limits
Certain APIs are strictly limited to one request per second. This restriction is in place to prevent excessive use of resources and to maintain optimal performance for all users. The restricted APIs subject to this one request per second limit include:
Auction
Buildsheet
Europe VIN Decode
License Plate OCR
Title Check
US Plate Decode
VIN OCR
VIN Suggestion
Package-specific Limits
The rate limit may vary from package to package. It is essential to review the documentation for each package to understand the specific rate limits imposed.Apart from above mentioned APIs in “Strict Limits” section all other APIs will follow rate limiting based on the package users will subscribe to. Please find the rate limits based on packages on Vehicle Databases Portal

Rate Limit Exceeded
If the quota is exceeded, the API will respond with an HTTP status code 429, indicating that the rate limit has been exceeded. Along with the error code, the API will return an error message stating, Rate limit is exceeded. Try again later. This message serves as a notification to the user that they have reached the rate limit and should adjust their request frequency accordingly.

Ensuring Compliance
Developers utilizing our APIs should implement logic within their applications to handle rate limit responses gracefully. This includes implementing appropriate retry mechanisms to prevent overwhelming the API with repeated requests.

