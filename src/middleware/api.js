import { schema, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

const API_ROOT = 'https://api.github.com/'

// const callApi = (endpoint, schema) => {
//     const fullApi = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
//     return fetch(fullApi).then()
// }