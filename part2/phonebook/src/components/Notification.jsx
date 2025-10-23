const Notification = ({ message, type }) => {
  if (message === null) return null

  const notfStyle = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return <div className="error" style={notfStyle}>{message}</div>
}

export default Notification