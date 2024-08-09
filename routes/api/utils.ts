import {Request, Response, NextFunction} from 'express';
import { ValidationChain } from 'express-validator';

// sequential processing, stops running validations chain if the previous one fails.
const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);

      if (!result.isEmpty()) {
        // If validation failed, return the error response immediately
        return res.status(400).json({ errors: result.array() });
      }
    }

    // If all validations passed, call the next middleware
    return next();
  };
};


export { validate }