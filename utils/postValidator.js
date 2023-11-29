
const validate = (title, body) => {

    // validate the request
    if(!title) {
        throw Error('The title is required')
    }
    if(!body) {
        throw Error('The body is required')
    }
    if(typeof title !== "string") {
        throw Error('The title must be alphanumeric')
    }
    if(typeof body !== "string") {
        throw Error('The body must be alphanumeric')
    }
    if(title.length < 3) {
        throw Error('The title is too short, at least 3 chars')
    }
    if(body.length < 3) {
        throw Error('The body is too short, at least 3 chars')
    }
    if(title.trim().length === 0) {
        throw Error('Invalid title')
    }
    if(body.trim().length === 0) {
        throw Error('Invalid body')
    }
}

module.exports = { validate }