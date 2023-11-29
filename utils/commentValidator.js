
const validate = (content) => {

    // field validation
    if (!content) {
        throw Error("Comment content is required")
    }
    if (typeof content !== "string") {
        throw Error("Comment content must be alphanumeric")
    }
    if (content.trim().length === 0) {
        throw Error("Comment content is invalid")
    }
}

module.exports = { validate }