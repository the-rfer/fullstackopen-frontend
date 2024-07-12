import axios from 'axios';
import PropTypes from 'prop-types';
const baseUrl = '/api/login';

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};

login.propTypes = {
    credentials: PropTypes.object.isRequired,
};

export default { login };
