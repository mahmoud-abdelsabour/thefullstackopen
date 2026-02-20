import { Link } from "react-router-dom"

const Blogs = ({blogs}) => {
    const byLikes = (a, b) => b.likes - a.likes

    return(
        <ul>
            {blogs.sort(byLikes).map((blog) => (
                <li>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
            ))}
        </ul>
    )
}

export default Blogs