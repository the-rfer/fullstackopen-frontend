import { useState } from 'react';
import blogService from '../services/blogs';

const CreateBlog = ({ token, setBlogs, blogs }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const post = {
            title: title,
            url: url,
        };

        const response = await blogService.postBlog({ token, post });

        if (!response) return console.log('ERROR CREATING NEW POST!');

        setBlogs([...blogs, response]);
        setTitle('');
        setUrl('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create new</h2>
            <p>
                <label htmlFor='title'>title</label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </p>
            <p>
                <label htmlFor='url'>url</label>
                <input
                    type='text'
                    id='url'
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </p>
            <button>Create</button>
        </form>
    );
};
export default CreateBlog;
