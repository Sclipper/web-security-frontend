import callAPI from "./callAPI"

const getMe = () => {
  return callAPI(`/users/me`, {
    method: "get",
  })
  .then(({ data }) => {
    return data
  })
  .catch(err => {
    console.log('pachangameiner')
  })
}
export default getMe
