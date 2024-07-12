import { useState } from 'react';
import blogService from '../services/blogs';

const CreateBlog = ({ token, setBlogs, blogs, setNotification }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const post = {
            title: title,
            url: url,
        };

        blogService
            .postBlog({ token, post })
            .then((response) => {
                setBlogs([...blogs, response]);
                setTitle('');
                setUrl('');
                setNotification({
                    message: 'New post created!',
                    type: 'success',
                });
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            })
            .catch((error) => {
                setNotification({
                    message: error.response.data.error,
                    type: 'error',
                });
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                style={{ display: isVisible ? '' : 'none' }}
            >
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
                <button type='submit'>Create</button>
            </form>
            <button type='button' onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? 'Cancel' : 'Create new'}
            </button>
        </>
    );
};
export default CreateBlog;
