//remove password from user for Response
const removePassword = function (data){
    const user = { ...data }
    console.log(user)
    delete user._doc.password
    console.log(user)
    return user._doc
}

module.exports = removePassword