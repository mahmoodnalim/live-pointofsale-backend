import { Router } from 'express';
import Jwt from 'jsonwebtoken';
import requestValidator from '../middleware/requestValidator';
import { LOGIN_BODY_VALIDATOR } from './validators/auth';
import { isValidPassword } from '../models/Employee';
import config from '../config';

const authRoute = Router();

authRoute.post(
  '/login',
  requestValidator({ reqBodyValidator: LOGIN_BODY_VALIDATOR }),
  async (req, res) => {
    try {
      const { employeeId, password } = req.body;
      const employeeWithValidPassword = await isValidPassword(
        employeeId,
        password
      );

      // employee roleInPOS is not enough to login
      if (employeeWithValidPassword === null) {
        throw new Error('Employee Does not have permission to Login');
      }

      // wrong password
      if (!employeeWithValidPassword) {
        res.status(400);
        throw new Error('Invalid credential');
      }

      // success login create JWT.
      const token = Jwt.sign(
        {
          id: employeeWithValidPassword.id,
          roleInPOS: employeeWithValidPassword.roleInPOS
        },
        config.JWT_SECRET
      );
      res.json({ token });
      return;
    } catch (ex) {
      res.status(res.statusCode || 500).json({ error: ex.message });
    }
  }
);

export default authRoute;
