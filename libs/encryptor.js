const CryptoJS = require('crypto-js')

exports.encryptData = async (data) => {
    let encryptedData

    if(typeof data === 'string') {
        encryptedData = CryptoJS.AES.encrypt(data, process.env.PUBLIC_KEY).toString()
    }

    if(typeof data === 'number') {
        encryptedData = CryptoJS.AES.encrypt(data.toString(), process.env.PUBLIC_KEY).toString()
    }

    if(typeof data === 'object') {
        encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.PUBLIC_KEY).toString()
    }

    return encryptedData
}  

exports.decryptData = async (encryptedData) => {
    let decryptedData = CryptoJS.AES.decrypt(encryptedData, process.env.PUBLIC_KEY).toString(CryptoJS.enc.Utf8)

    return JSON.parse(decryptedData)
}