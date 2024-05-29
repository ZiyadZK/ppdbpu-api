exports.validateApiKey = (req, res, next) => {
    const api_key = req.header('x-api-key')
    if(api_key !== process.env.API_KEY) {
        return res.status(403).json({
            message: 'Anda tidak memiliki API Key yang sesuai dengan yang ada di server!',
            api_key
        })
    }

    next()
}

exports.validateBody = async (req, res, next) => {
    try {
        const body = await req.body
        const jsonKeys = Object.keys(body)

        if (jsonKeys.length < 1) {
            return res.status(400).json({
                message: 'JSON Body tidak berisi apa-apa, masih kosong!'
            });
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Terdapat kesalahan dalam parsing JSON body',
            debug: {
                error
            }
        })
    }
}