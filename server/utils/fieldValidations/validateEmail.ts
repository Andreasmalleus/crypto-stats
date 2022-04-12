export default (email : string) => {
  if(!email.includes("@")){
    return {
      error : {
        field : "email",
        message : "Email is invalid"
      }
    }
}

  if(email.length < 5){
    return {
      error : {
        field : "email",
        message : "Email must be at least 5 characters"
      }
    }
  }
  return null
}