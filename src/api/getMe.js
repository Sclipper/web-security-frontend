import callAPI from "./callAPI"

const getMe = () => {
  return callAPI(`/users/me`, {
    method: "get",
  })
  .then(({ data }) => {
    console.log('dataa', data)
    // cookies.set("apiToken", data.token, { path: "/" })
    return data
  })
}
export default getMe
