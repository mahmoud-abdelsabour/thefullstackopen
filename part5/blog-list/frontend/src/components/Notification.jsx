const Notification = ({ notification }) => {
    if(!notification || !notification.message) return null

    const notfStyle = {
        color: notification.type === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
   }

    return <div className="error" style={notfStyle}>{ notification.message }</div>
}

export default Notification