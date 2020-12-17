import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const callAPI = async (endpoint, request) => {
  const {
    method = 'get',
    data,
    headers,
  } = request

  const accessToken = cookies.get('apiToken')
  cookies.get('apiKey')
  return axios({
    url: `http://localhost:3001${endpoint}`,
    method,
    timeout: 30000,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
      ...headers,
    },
    data,
  })
}

export default callAPI
