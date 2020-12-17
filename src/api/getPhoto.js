import callAPI from "./callAPI"

const getPhoto = () => {
  return callAPI(`/photos/5fdb9aeb7a619d5b64f41f19`, {
    method: "get",
  })
  .then((res) => {
    return res
  })
}
export default getPhoto
