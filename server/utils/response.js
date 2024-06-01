export const ResponseTypes = Object.freeze({
    OK:   200,
    CREATED:   201,
    ACCEPTED:   202,
    BAD_REQUEST:  400,
    UNAUTHORISED:  401,
    NOT_FOUND: 404
});

export let response = (res, type, message, data) => {
    let status  = 'SUCCESS'
    if(type == 400 || type == 401 || type == 404) { status = 'FAILED' }

    res.status(type).json({
        status: status,
        message: message,
        data: data
    });
}