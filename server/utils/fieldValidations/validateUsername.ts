export default (username : string) => {
	if(username.length < 3){
		return {
			error : {
				field : "username",
				message : "Username must be at least 3 characters"
			}
		}
	}
	if(username.length > 30){
		return {
			error : {
				field : "username",
				message : "Username cannot be more than 30 characters"
			}
		}
	}

	if(username.includes('@')){
		return {
			error : {
				field : "username",
				message : "Username must not contain @"
			}
		}
	}
	return null
}