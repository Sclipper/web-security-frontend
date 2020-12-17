import * as React from "react"

import { makeStyles, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { getPhoto } from "../api"

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
}))

const Home = ({ user, setUser }) => {
  const classes = useStyles()
  let history = useHistory()
  const [image, setImage] = React.useState('')

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
      <img alt='bla' src={image}/>
    </div>
  )
}

export default Home
