
const Users = ({users}) => {
    
    return(
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                    <th><strong>user</strong></th>
                    <th><strong>blogs created</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>(
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users