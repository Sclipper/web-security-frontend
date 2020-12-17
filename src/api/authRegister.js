import callAPI from "./callAPI"
import Cookies from "universal-cookie"

const cookies = new Cookies()

const authRegister = ({ email, password, name }) => {
  return callAPI(`/users`, {
    method: "post",
    data: {
      name,
      email,
      password,
    },
  }).then(({ data }) => {
    cookies.set("apiToken", data.token, { path: "/" })
    return data
  })
}
export default authRegister
