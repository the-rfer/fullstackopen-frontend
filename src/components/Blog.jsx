const Blog = ({ blog }) => {
    return (
        <div>
            {blog.title} {blog.author.username}
        </div>
    );
};

export default Blog;
