function getAuthHeader(){

    const token = localStorage.getItem("accessToken")
    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }        
    }
    console.log(authHeader)
    return authHeader
}
export {getAuthHeader}