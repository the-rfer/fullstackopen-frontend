import axios from 'axios';
import PropTypes from 'prop-types';
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

postBlog.propTypes = {
    post: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
};

incrementLikes.propTypes = {
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
};

deleteBlog.propTypes = {
    id: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
};

export default { getAll, postBlog, incrementLikes, deleteBlog };
