/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  return new Promise((resolve, reject) => {
    if (response.status >= 200 && response.status < 300) {
      if (response.status === 204 || response.status === 205) {
        return null;
      }
      resolve(response.json());
    }

    response.json().then((json) => {
      reject(json);
    }).catch((error) => {
      reject(error);
    })
  });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url) {
  return fetch(url, {
    method: 'GET',
    credentials: 'include',
  })
    .then(checkStatus)
}

export function requestJSON(data) {
  return fetch(data.requestURL, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.post)
  })
    .then(checkStatus)
}
