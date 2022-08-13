import axios from "axios";

const handleErrorResp = (err) => {
    return err.response && err.response.data
        ? Promise.reject(err.response.data)
        : Promise.reject(err);
};

// /**
//  * This function makes a HTTP GET request using the args provided
//  * @param {string} path the path to the microservice endpoint
//  * @param {QuerySchema} query optional query containing params in keyvalue pairs
//  * @returns {Promise} promise containing response data or errors
//  */
export const httpGet = async (url = "", query = {}) => {
    try {
        return await axios.get(url, query)
    }
    catch (err) {
        return handleErrorResp(err);
    }
};


// /**
//  * This function makes a HTTP POST request using the args provided
//  * @param {string} path the path to the microservice endpoint
//  * @param {QuerySchema} query optional query containing params in keyvalue pairs
//  * @param {QuerySchema} payload optional body containing the request payload
//  * @returns {Promise} promise containing response data or errors
//  */
export const httpPost = async (url = "", payload = {}, query = {}) => {
    try {
        return await axios.post(url, payload, query)
    }
    catch (err) {
        return handleErrorResp(err)
    }
};

// /**
//  * This function makes a HTTP PUT request using the args provided
//  * @param path the path to the microservice endpoint
//  * @param query optional query containing params in keyvalue pairs
//  * @param payload optional body containing the request payload
//  * @returns promise containing response data or errors
//  */
export const httpPut = async (url, payload = {}, query = {}) => {
    try {
        return await axios.put(url, payload, query)
    }
    catch (err) {
        return handleErrorResp(err)
    };
};

// /**
//  * This function makes a HTTP DELETE request using the args provided
//  * @param {string} path the path to the microservice endpoint
//  * @param {QuerySchema} query optional query containing params in keyvalue pairs
//  * @param {QuerySchema} payload optional payload containing data in keyvalue pairs;
//  *   although not customary, some of our endpoints for DELETE requests expect a payload.
//  * @returns {Promise} containing response data or errors
//  */
export const httpDelete = async (url, query = {}) => {
    try {
        return await axios.delete(url, query)
    }
    catch (err) {
        return handleErrorResp(err)
    };
};
