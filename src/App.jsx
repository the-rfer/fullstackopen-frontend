import { useState, useEffect } from 'react';
import Error from './components/Notification';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';
import CreateBlog from './components/CreateBlog';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);

    const handleLogout = () => {
        window.localStorage.removeItem('user');
        setUser(null);
    };

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
            setBlogs(sortedBlogs);
        });

        if (window.localStorage.getItem('user'))
            setUser(JSON.parse(window.localStorage.getItem('user')));
    }, []);

    if (user === null)
        return (
            <>
                <Login setUser={setUser} setNotification={setNotification}>
                    <Error notification={notification} />
                </Login>
            </>
        );

    return (
        <>
            <div>
                <h3>
                    {user.name} logged in{' '}
                    <button onClick={handleLogout}>Logout</button>
                </h3>
                <Error notification={notification} />
                <CreateBlog
                    token={user.token}
                    setBlogs={setBlogs}
                    blogs={blogs}
                    setNotification={setNotification}
                />
                <h1>blogs</h1>
                {blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        token={user.token}
                        setBlogs={setBlogs}
                        blogs={blogs}
                        username={user.username}
                    />
                ))}
            </div>
        </>
    );
};

export default App;
