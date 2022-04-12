export default (password : string) => {
  if(password.length == 0){
    return {
        error : {
            field : "password",
            message : "Password cannot be empty"
        }
    }
  }

	if(password.length <= 5){
		return {
			error : {
				field : "password",
				message : "Password must be equal or bigger than 5 characters"
			}
		}
	}

	if(password.toLowerCase() == password){
		return {
			error : {
				field : "password",
				message : "Password must contain at least one capital letter"
			}
		}
	}
	return null
}