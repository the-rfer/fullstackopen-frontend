import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const postBlog = async ({ post, token }) => {
    const response = await axios.post(baseUrl, post, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data;
};

const incrementLikes = async ({ id, token }) => {
    const response = await axios.put(
        `${baseUrl}/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};

const deleteBlog = async ({ id, token }) => {
    const response = await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export default { getAll, postBlog, incrementLikes, deleteBlog };
