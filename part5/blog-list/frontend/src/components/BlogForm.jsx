import { useState } from "react"
{/* 5.6 Blog List Frontend, step 6 is already done */}
const BlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('') 

    const addBlog = (event) => {
        event.preventDefault()
        
        createBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <div>
            <h2>Create New</h2>
            <form onSubmit={addBlog}>
            <div>
                <label>
                Title
                <input
                type="text"
                value={title}
                onChange={({target}) => setTitle(target.value)}
                />
                </label>
            </div>
            <div>
                <label>
                Author
                <input
                type="text"
                value={author}
                onChange={({target}) => setAuthor(target.value)}
                />
                </label>
            </div>
            <div>
                <label>
                URL
                <input
                type="text"
                value={url}
                onChange={({target}) => setUrl(target.value)}
                />
                </label>
            </div>
            <button type="submit">Add</button>
            </form>
        </div>

    )
}

export default BlogForm