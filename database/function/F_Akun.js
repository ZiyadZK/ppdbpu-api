const M_Akun = require("../model/M_Akun")

exports.F_Akun_get = async (parameter) => {
    try {
        const data = await M_Akun.findOne({
            where: parameter,
            raw: true
        })
        
        return {
            success: true,
            data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false
        }        
    }
}

exports.F_Akun_getAll = async () => {
    try {
        const data = await M_Akun.findAll({
            raw: true
        })
        
        return {
            success: true,
            data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false
        }        
    }
}

exports.F_Akun_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_Akun.bulkCreate(payload)
        }else{
            await M_Akun.create(payload)
        }
        
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false
        }        
    }
}

exports.F_Akun_update = async (id_akun, payload) => {
    try {
        if(Array.isArray(id_akun)) {
            await Promise.all(id_akun.forEach(async value => await M_Akun.update(payload, {
                where: {
                    id_akun: value
                }
            })))
        }else{
            await M_Akun.update(payload, {
                where: {
                    id_akun
                }
            })
        }
        
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false
        }        
    }
}

exports.F_Akun_delete = async (id_akun) => {
    try {

        if(Array.isArray(id_akun)) {
            await Promise.all(id_akun.forEach(async value => await M_Akun.destroy({
                where: {
                    id_akun: value
                }
            })))
        }else{
            await M_Akun.destroy({
                where: {
                    id_akun
                }
            })
        }
        
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false
        }        
    }
}