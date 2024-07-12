import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';
import CreateBlog from './components/CreateBlog';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        window.localStorage.removeItem('user');
        setUser(null);
    };

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
        if (window.localStorage.getItem('user'))
            setUser(JSON.parse(window.localStorage.getItem('user')));
    }, []);

    if (user === null) return <Login setUser={setUser} />;

    return (
        <>
            <div>
                <h3>
                    {user.name} logged in{' '}
                    <button onClick={handleLogout}>Logout</button>
                </h3>
                <CreateBlog
                    token={user.token}
                    setBlogs={setBlogs}
                    blogs={blogs}
                />
                <h1>blogs</h1>
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        </>
    );
};

export default App;
