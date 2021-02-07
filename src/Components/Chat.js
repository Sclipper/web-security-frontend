import React from "react"

import io from "socket.io-client"

import { Button, Paper, TextField, Typography } from "@material-ui/core"

const Chat = ({ id }) => {
  const [socket, setSocket] = React.useState()
  const [messageBox, setMessageBox] = React.useState([])
  const [message, setMessage] = React.useState("")
  const [recipient, setRecipient] = React.useState("")
  const [rec, setRec] = React.useState("")

  React.useEffect(() => {
    const newSocket = io("http://localhost:3002", {
      query: { id },
    })
    setSocket(newSocket)
    console.log("newSocket", newSocket)
    return () => newSocket.close()
  }, [id])

  React.useEffect(() => {
    if (!socket) return

    socket.on("receive-message", ({ recipients, sender, text }) => {
      setMessageBox([...messageBox, { sender: sender, text }])
      setRecipient(sender)
    })
    return () => socket.off("receive-message")
  }, [socket, messageBox, message, id])

  const handleSendMessage = (e) => {
    e.preventDefault()
    socket.emit("send-message", { recipients: [id, recipient], text: message })
    setMessageBox([...messageBox, { sender: "me", text: message }])
    setMessage("")
  }
  const handleSubmitRecipient = (e) => {
    e.preventDefault()
    if (rec.length > 5) {
      setRecipient(rec)
    }
  }

  return (
    <div>
      {recipient || messageBox?.length ? (
        <Paper>
          <Typography
            style={{
              padding: "0.5rem",
              backgroundColor: "#303F9F",
              color: "white",
              borderRadius: "0.25rem",
            }}
          >
            Chat with:{" "}
            <b>
              {messageBox?.[0]?.sender === "me" || !messageBox?.[0]
                ? recipient
                : messageBox?.[0]?.sender}
            </b>
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {messageBox.map((message, i) => (
              <Typography
                key={i}
                style={
                  message.sender === "me"
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "blue",
                        color: "white",
                        margin: "0.5rem",
                        padding: "0.2rem",
                        borderRadius: "0.5rem",
                      }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "darkgray",
                        color: "white",
                        margin: "0.5rem",
                        padding: "0.2rem",
                        borderRadius: "0.5rem",
                      }
                }
              >
                {message.text}
              </Typography>
            ))}
          </div>
          <form onSubmit={handleSendMessage} style={{ display: "flex" }}>
            <TextField
              value={message}
              autoFocus
              style={{ width: "100%" }}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </form>
        </Paper>
      ) : (
        <form onSubmit={handleSubmitRecipient} style={{ display: "flex" }}>
          <TextField
            onChange={(e) => setRec(e.target.value)}
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Select recipient
          </Button>
        </form>
      )}
    </div>
  )
}

export default Chat
