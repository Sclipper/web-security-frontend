import callAPI from "./callAPI"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const authLogout = () => {
  return callAPI(`/users/logout `, {
    method: "post",
  })
  .then(() => {
    cookies.set("apiToken", 'pachanga', { path: "/" })
  })
  .catch(err => {
    console.log('pachangameiner')
  })
}
export default authLogout
