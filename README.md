# Ndume

Ndume is a JavaScript class designed to simplify API calls using the fetch method. It provides a convenient way to make HTTP requests with support for various HTTP methods, request headers, and request body formats.

## Installation

Install the Ndume package using npm:

```bash

npm install ndume

1. ** Usage **
## Usage
const Ndume = require('ndume');

// Create an instance of Ndume with the base API route
const api = new Ndume('https://api.example.com');

// Set an authorization token if required
api.setToken({
  type: 'Bearer',
  token: 'your_access_token',
});

// Make a GET request
api.GET('/endpoint')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
2. ** API **
## API
new Ndume(baseRoute: string)
Creates a new instance of Ndume with the specified base route.

setToken(token: { type: string, token: string })
Sets the authorization token for the requests.

BaseRequest(method: string, bodyType: string, body: any, path: string, params: Object): Promise<Response>
Performs a basic request using the fetch method. Returns a Promise containing the fetch request response.

BodyTreatMent(body: any, bodyType: string): Promise<any>
Formats the request body to the proper format. Returns a Promise containing the formatted request body.

ParamThreatMent(params: Object): string
Formats request parameters to a query string. Returns the formatted parameter string.

POST(body: any, bodyType: string, path: string, params: Object): Promise<Response>
Performs a POST request. Returns a Promise containing the POST request response.

PUT(body: any, bodyType: string, path: string, params: Object): Promise<Response>
Performs a PUT request. Returns a Promise containing the PUT request response.

GET(path: string, params: Object): Promise<Response>
Performs a GET request. Returns a Promise containing the GET request response.

DELETE(path: string, params: Object): Promise<Response>
Performs a DELETE request. Returns a Promise containing the DELETE request response.

PATCH(body: any, bodyType: string, path: string, params: Object): Promise<Response>
Performs a PATCH request. Returns a Promise containing the PATCH request response.


3. ** License **
## License

4. ** Contribuition ** 
## Contribuições

Fique à vontade para contribuir para este projeto. Veja o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para obter detalhes.
