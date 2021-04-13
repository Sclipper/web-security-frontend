import * as React from "react"

import { makeStyles, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { getPhoto } from "../api"
import Chat from './Chat'

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'column'
  },
}))

const Home = ({ user, setUser }) => {
  const classes = useStyles()
  let history = useHistory()
  const [image, setImage] = React.useState('')
  const [isChat, setIsChat] = React.useState(false)

  React.useEffect(() => {
    if(!image && user?._id){
      console.log('user?._id', user?._id)
      getPhoto(user?._id).then(res => {
        console.log('res', res)
        setImage(res.data)
      })
    }
  }, [image])

  if (!user) {
    history.push("/login")
  }
  return (
    <div className={classes.container}>
      <Typography variant="h2"> Welcome {user?.name} </Typography>
      <Typography variant="h4">Share your id with others: {user?._id} </Typography>
      <div>
      <Chat id={user?._id} />
      <img width={450} height={550} src={`https://storage.cloud.google.com/pictures_bucket_web_sec_2/${image}.jpg`}/>
      </div>
    </div>
  )
}

export default Home
