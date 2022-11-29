//remove password 
const removePassword = function (data){
    const user = { ...data }
    delete user._doc.password
    return user._doc
}

module.exports = removePassword