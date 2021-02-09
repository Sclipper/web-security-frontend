import * as React from "react"

import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core"

import { upploadPhoto } from "../api"
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    margin: "0 auto",
  },
  textField: {
    margin: "0.3rem",
  },
}))

const Uppload = () => {
  const classes = useStyles()
  const [files, setFiles] = React.useState([])
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [isVisible, setIsVisible] = React.useState(true)

  /**
   title: string
   description: string
   visibility boolean
   * 
   */

  const handleSubmit = (e) => {
    e.preventDefault()
    upploadPhoto({
      photo: files[0],
      title,
      description,
      visibility: isVisible,
    }).then(() => {
      setFiles([])
      setTitle('')
      setDescription('')
    })
  }
  return (
    <div>
      <form type="submit" onSubmit={handleSubmit} className={classes.form}>
        <TextField
          value={title}
          className={classes.textField}
          onChange={(e) => setTitle(e.target.value)}
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          value={description}
          className={classes.textField}
          onChange={(e) => setDescription(e.target.value)}
          id="outlined-basic"
          label="Description"
          variant="outlined"
        />
        <FilePond
          files={files}
          allowMultiple={false}
          onupdatefiles={(fileItems) => {
            setFiles(fileItems.map((fileItem) => fileItem.file))
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isVisible}
              onChange={() => setIsVisible(!isVisible)}
              name="checkedA"
            />
          }
          label="Visible for everyone"
        />
        <Button
          type="submit"
          style={{
            color: "black",
            width: "50%",
            alignSelf: "center",
            backgroundColor: "orange",
          }}
          variant="contained"
          color="inherit"
        >
          Uppload
        </Button>
      </form>
    </div>
  )
}

export default Uppload
