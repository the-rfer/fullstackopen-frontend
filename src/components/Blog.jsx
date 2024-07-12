import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, token, setBlogs, username }) => {
    const [showDetails, setShowDetails] = useState(false);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '500px',
    };

    const buttonStyle = {
        cursor: 'pointer',
        width: '60px',
        marginRight: '10px',
        position: 'absolute',
        top: '20px',
        right: '10px',
    };

    const like = () => {
        blogService
            .incrementLikes({ id: blog.id, token })
            .then((updatedBlog) => {
                setBlogs((blogs) =>
                    blogs.map((blog) =>
                        blog.id === updatedBlog.id
                            ? { ...blog, likes: updatedBlog.likes }
                            : blog
                    )
                );

                setBlogs((blogs) =>
                    [...blogs].sort((a, b) => b.likes - a.likes)
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = () => {
        if (
            window.confirm(
                'Are you sure you want to delete this blog?\nThis action cannot be undone.'
            )
        ) {
            blogService.deleteBlog({ id: blog.id, token }).then(() => {
                setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id));
            });
        }
    };

    return (
        <div style={blogStyle}>
            <div>
                <p>{blog.title}</p>
                <div style={{ display: showDetails ? '' : 'none' }}>
                    <p>{blog.url}</p>
                    <p>
                        likes: {blog.likes} <button onClick={like}>like</button>
                    </p>
                    <p>author: {blog.author.username}</p>
                    {username === blog.author.username && (
                        <button onClick={handleDelete}>delete</button>
                    )}
                </div>
            </div>
            <button
                style={buttonStyle}
                onClick={() => setShowDetails(!showDetails)}
            >
                {showDetails ? 'hide' : 'view'}
            </button>
        </div>
    );
};

export default Blog;
