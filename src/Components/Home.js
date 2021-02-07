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
    if(!image){
      getPhoto().then(res => {
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
      </div>
    </div>
  )
}

export default Home
