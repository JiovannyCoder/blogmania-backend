// validator
const validator = require('validator')

const validate = (email, password, firstname, lastname) => {
    if(
        !email || 
        !password ||
        !firstname ||
        !lastname 
    ) {
        throw Error("Please, fill all fields")
    }
    if(!validator.isEmail(email)) {
        throw Error("Enter a valid email please")
    }
    if(!validator.isStrongPassword(password)) {
        throw Error("Your password is still too weak")
    }
    if(!validator.isAlpha(firstname)) {
        throw Error("Invalid firstname, please no spaces, just letters")
    }
    if(!validator.isAlpha(lastname)) {
        throw Error("Invalid lastname, please no spaces, just letters")
    }
    if(firstname.length < 3) {
        throw Error("Enter a valid firstname, at least 3 chars")
    }
    if(firstname.length < 3) {
        throw Error("Enter a valid firstname, at least 3 chars")
    }
}

module.exports = { validate }