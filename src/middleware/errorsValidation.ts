import { NextFunction, Request, Response,} from "express";
import {FieldValidationError, ValidationError, validationResult} from "express-validator";
import {dbBlogs} from "../db/dbBlogs";



export const errorsValidation = (req:Request, res:Response, next:NextFunction) => {

        const errors = validationResult(req);
        const errorMessages: { message: string, field: string}[]=[];
        if(!errors.isEmpty()){
            errors.array({onlyFirstError:true}).forEach((error) => {
                errorMessages.push({ message: 'Bad request',  field: error.type === 'field'? error.path: 'not found field' });
            })
            res.status(400).json({ errorsMessages: errorMessages });
        }

    next()
}

