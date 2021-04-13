import callAPI from "./callAPI"

const getPhoto = (userId) => {
  return callAPI(`/photos/${userId}`, {
    method: "get",
  })
  .then((res) => {
    return res
  })
}
export default getPhoto
