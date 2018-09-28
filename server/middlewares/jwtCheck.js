import expressjwt from 'express-jwt';
import dotenv from 'dotenv';
import config from '../../config';

const jwtCheck = expressjwt({
  secret: config.SECRET,
});

export default jwtCheck;
