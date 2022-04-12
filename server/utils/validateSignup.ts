import validateEmail from "./fieldValidations/validateEmail"
import validatePassword from "./fieldValidations/validatePassword";
import validateUsername from "./fieldValidations/validateUsername";

interface signupInput{
    email: string;
    username: string;
    password: string;
}

export interface signupOutput{
    error : {
        field : string,
        message : string
    }
}

export const validateSignup = (values : signupInput) : signupOutput | null => {

    const emailValidation= validateEmail(values.email);

    const usernameValidation= validateUsername(values.username);

    const passwordValidation= validatePassword(values.password);

    if(emailValidation || usernameValidation || passwordValidation){
        return emailValidation || usernameValidation || passwordValidation;
    }

    return null;
}