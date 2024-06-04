const { Op, Sequelize } = require("sequelize")
const M_Siswa = require("../model/M_Siswa")

exports.F_Siswa_getAll = async (parameter) => {
    try {
        const data = await M_Siswa.findAll({
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
            success: false,
            message: error.message
         }
    }
}

exports.F_Siswa_get = async (parameter) => {
    try {
        const data = await M_Siswa.findOne({
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
            success: false,
            message: error.message
        }
    }
}

exports.F_Siswa_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_Siswa.bulkCreate(payload)
        }else{
            await M_Siswa.create(payload)
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Siswa_update = async (nisn, payload) => {
    try {
        if(Array.isArray(nisn)) {
            await M_Siswa.update(payload, {
                where: {
                    nisn: {
                        [Op.in]: nisn
                    }
                }
            })
        }else{
            await M_Siswa.update(payload, {
                where: {
                    nisn
                }
            })
        }
        
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Siswa_delete = async (nisn) => {
    try {
        if(Array.isArray(nisn)) {
            console.log('array')
            await M_Siswa.destroy({
                where: {
                    nisn: {
                        [Op.in]: nisn
                    }
                }
            })
        }else{
            await M_Siswa.destroy({
                where: {
                    nisn
                }
            })
        }
        
        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Siswa_count = async (parameter) => {
    try {

        const amount = await M_Siswa.count({
            where: parameter
        })

        return amount
        
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}