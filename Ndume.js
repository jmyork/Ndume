/**
 * Class Ndume
 *
 * A class to simplify API calls using the fetch method.
 *
 * @class
 */
class Ndume {
    /**
     * @property {string} baseRoute - Base route for all requests.
     * @property {Object} token - Authorization token object.
     * @property {string} token.type - Token type.
     * @property {string} token.token - Access token.
     */
    static baseRoute;
    static token;
  
    /**
     * Constructor for the Ndume class.
     *
     * @constructor
     * @param {string} baseRoute - Base route for all requests.
     */
    constructor(baseRoute) {
      this.baseRoute = baseRoute;
    }
  
    /**
     * Set the authorization token.
     *
     * @param {Object} token - Authorization token object.
     * @param {string} token.type - Token type.
     * @param {string} token.token - Access token.
     */
    setToken(token) {
      this.token = token;
    }
  
    /**
     * Perform a basic request using the fetch method.
     *
     * @async
     * @param {string} method - HTTP method (GET, POST, PUT, DELETE, PATCH).
     * @param {string} bodyType - Content type of the request body ('json' or null).
     * @param {any} body - Request body.
     * @param {string} path - Request path.
     * @param {Object} params - Request parameters.
     * @returns {Promise<Response>} - Promise containing the fetch request response.
     * @throws {Error} - Throws an error if the request fails.
     */
    async BaseRequest(method = 'GET', bodyType = null, body = null, path, params = null) {
      try {
        const url = `${this.baseRoute}/${path ?? ''}${params ?? ''}`;
  
        if (this.token && bodyType === 'json') {
          return await fetch(url, {
            method: method,
            headers: {
              Authorization: this.token?.type + ' ' + this.token?.token,
              'Content-Type': 'application/json',
            },
            body: body,
          });
        } else if (!this.token && bodyType === 'json') {
          return await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: body,
          });
        } else if (this.token && bodyType !== 'json') {
          return await fetch(url, {
            method: method,
            headers: {
              Authorization: this.token?.type + ' ' + this.token?.token,
            },
            body: body,
          });
        } else if (!this.token && bodyType !== 'json') {
          return await fetch(url, {
            method: method,
            body: body,
          });
        }
      } catch (error) {
        throw error;
      }
    }
  
    /**
     * Format the request body to the proper format.
     *
     * @async
     * @param {any} body - Request body.
     * @param {string} bodyType - Content type of the request body ('json' or null).
     * @returns {Promise<any>} - Promise containing the formatted request body.
     * @throws {string} - Throws a string error if the body is not an object.
     */
    async BodyTreatMent(body, bodyType) {
      if (!body && !Object(body)) throw 'An object was expected!';
  
      if (bodyType === 'json') return JSON.stringify(body);
      else {
        const newForm = new FormData();
  
        for (let currentValue in body) newForm.append(currentValue, body[currentValue]);
  
        return newForm;
      }
    }
  
    /**
     * Format request parameters to a query string.
     *
     * @param {Object} params - Request parameters.
     * @returns {string} - Formatted parameter string.
     * @throws {string} - Throws a string error if the parameters are not a valid object.
     */
    ParamThreatMent(params) {
      if (!params || Object.keys(params)?.length === 0)
        throw 'The params need to be an object. e.g: {key1:value1,key2:value2} and so on';
  
      let formatedParams = '/';
  
      for (let currentValue in params) {
        formatedParams = formatedParams + '' + params[currentValue] + '/';
      }
  
      return formatedParams;
    }
  
    /**
     * Perform a POST request.
     *
     * @async
     * @param {any} body - Request body.
     * @param {string} bodyType - Content type of the request body ('json' or null).
     * @param {string} path - Request path.
     * @param {Object} params - Request parameters.
     * @returns {Promise<Response>} - Promise containing the POST request response.
     * @throws {Error} - Throws an error if the request fails.
     */
    async POST(body, bodyType, path, params) {
      try {
        body = await this.BodyTreatMent(body, bodyType);
        params = params ? this.ParamThreatMent(params) : null;
  
        return await this.BaseRequest('POST', bodyType, body, path, params);
      } catch (error) {
        throw error;
      }
    }
  
    /**
     * Perform a PUT request.
     *
     * @async
     * @param {any} body - Request body.
     * @param {string} bodyType - Content type of the request body ('json' or null).
     * @param {string} path - Request path.
     * @param {Object} params - Request parameters.
     * @returns {Promise<Response>} - Promise containing the PUT request response.
     * @throws {Error} - Throws an error if the request fails.
     */
    async PUT(body, bodyType, path, params) {
      try {
        body = await this.BodyTreatMent(body, bodyType);
        params = params ? this.ParamThreatMent(params) : null;
  
        return await this.BaseRequest('PUT', bodyType, body, path, params);
      } catch (error) {
        throw error;
      }
    }
  
    /**
     * Perform a GET request.
     *
     * @async
     * @param {string} path - Request path.
     * @param {Object} params - Request parameters.
     * @returns {Promise<Response>} - Promise containing the GET request response.
     * @throws {Error} - Throws an error if the request fails.
     */
    async GET(path, params) {
      try {
        params = params ? this.ParamThreatMent(params) : null;
  
        return await this.BaseRequest('GET', null, null, path, params);
      } catch (error) {
        throw error;
      }
    }
  
    /**
     * Perform a DELETE request.
     *
     * @async
     * @param {string} path - Request path.
     * @param {Object} params - Request parameters.
     * @returns {Promise<Response>} - Promise containing the DELETE request response.
     * @throws {Error} - Throws an error if the request fails.
     */
    async DELETE(path, params) {
      try {
        params = params ? this.ParamThreatMent(params) : null;
  
        return await this.BaseRequest('DELETE', null, null, path, params);
      } catch (error) {
        throw error;
      }
    }
  
    /**
     * Perform a PATCH request.
     *
     * @async
     * @param {any} body - Request body.
     * @param {string} bodyType - Content type of the request body ('json' or null).
     * @param {string} path - Request path.
     * @param {Object} params - Request parameters.
     * @returns {Promise<Response>} - Promise containing the PATCH request response.
     * @throws {Error} - Throws an error if the request fails.
     */
    async PATCH(body, bodyType, path, params) {
      try {
        body = await this.BodyTreatMent(body, bodyType);
        params = params ? this.ParamThreatMent(params) : null;
  
        return await this.BaseRequest('PATCH', bodyType, body, null, path, params);
      } catch (error) {
        throw error;
      }
    }
  }
  
  module.exports = Ndume;
  