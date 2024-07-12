import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
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

export default { getAll, postBlog };
