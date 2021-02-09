import callAPI from "./callAPI"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const authLogin = ({ email, password }) => {
  return callAPI(`/users/login`, {
    method: "post",
    data: {
      email,
      password,
    },
  })
  .then(({ data }) => {
    cookies.set("apiToken", data.token, { path: "/" })
    return data.user
  })
  .catch(err => {
    console.log('pachangameiner')
  })
}
export default authLogin
