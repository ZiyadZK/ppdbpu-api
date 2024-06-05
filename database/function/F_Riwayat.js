const { Op } = require("sequelize")
const M_Riwayat = require("../model/M_Riwayat")

exports.F_Riwayat_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_Riwayat.bulkCreate(payload)
        }else{
            await M_Riwayat.create(payload)
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

exports.F_Riwayat_getAll = async () => {
    try {
        const data = await M_Riwayat.findAll({
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

exports.F_Riwayat_delete = async (id_riwayat) => {
    try {

        if(Array.isArray(id_riwayat)) {
            await M_Riwayat.destroy({
                where: {
                    id_riwayat: {
                        [Op.in]: id_riwayat
                    }
                }
            })
        }else{
            await M_Riwayat.destroy({
                where: {
                    id_riwayat
                }
            })
        }

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