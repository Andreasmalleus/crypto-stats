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

    if(!values.email.includes("@")){
        return {
            error : {
                field : "email",
                message : "Email is invalid"
            }
        }
    }

    if(values.email.length < 5){
        return {
            error : {
                field : "email",
                message : "Email must be at least 5 characters"
            }
        }
    }

    if(values.username.length < 3){
        return {
            error : {
                field : "username",
                message : "Username must be at least 3 characters"
            }
        }
    }

    if(values.username.length > 30){
        return {
            error : {
                field : "username",
                message : "Username cannot be more than 30 characters"
            }
        }
    }

    if(values.username.includes('@')){
        return {
            error : {
                field : "username",
                message : "Username must not contain @"
            }
        }
    }

    if(values.password.length == 0){
        return {
            error : {
                field : "password",
                message : "Password cannot be empty"
            }
        }
    }

    if(values.password.length <= 5){
        return {
            error : {
                field : "password",
                message : "Password must be equal or bigger than 5 characters"
            }
        }
    }

    if(values.password.toLowerCase() == values.password){
        return {
            error : {
                field : "password",
                message : "Password must contain at least one capital letter"
            }
        }
    }
    

    return null;
}