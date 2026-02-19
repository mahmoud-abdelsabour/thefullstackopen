import Blog from "./Blog"

const Blogs = ({blogs}) => {
    const byLikes = (a, b) => b.likes - a.likes

    return(
        <>
            {blogs.sort(byLikes).map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                />
            ))}
        </>
    )
}

export default Blogs