import Cookies from "universal-cookie"
import axios from "axios"

const cookies = new Cookies()

const upploadPhoto = (keys) => {
  let bodyFormData = new FormData()

  Object.keys(keys).forEach((key) => {
    bodyFormData.append(key, keys[key])
  })
  const accessToken = cookies.get("apiToken")
  return axios({
    method: "post",
    url: "http://localhost:3001/photos",
    data: bodyFormData,
    headers: {
      Authorization: accessToken,
      "Content-Type": "multipart/form-data",
    },
  })
  .catch(err => {
    console.log('pachangameiner')
  })
}
export default upploadPhoto
