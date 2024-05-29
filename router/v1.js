const express = require('express')
const { F_Akun_getAll, F_Akun_get, F_Akun_update, F_Akun_delete, F_Akun_create } = require('../database/function/F_Akun')
const { validateBody } = require('../middleware')
const { encryptData } = require('../libs/encryptor')

const route_v1 = express.Router()

.get('/v1', (req, res) => {
    return res.status(200).json({
        message: 'PPDB API v1 is Connected!'
    })
})

.get('/v1/data', (req, res) => {
    return res.status(200).json({
        message: 'PPDB API v1 is Connected!'
    })
})

// DATA AKUN
.get('/v1/data/akun', async (req, res) => {
    try {
        const response = await F_Akun_getAll()

        if(response.success) {
            return res.status(200).json({
                data: response.data
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'DATABASE ERROR'
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.post('/v1/data/akun', validateBody, async(req, res) => {
    try {

        const payload = await req.body
        const response = await F_Akun_create(payload)

        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil menambahkan akun'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'DATABASE ERROR'
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.put('/v1/data/akun', validateBody, async(req, res) => {
    try {

        const id_akun = await req.body.id_akun
        const payload = await req.body.payload

        const response = await F_Akun_update(id_akun, payload)

        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil mengubah data akun'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'DATABASE ERROR'
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.delete('/v1/data/akun', validateBody, async (req, res) => {
    try {

        const id_akun = await req.body.id_akun

        const response = await F_Akun_delete(id_akun)

        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil menghapus data akun!'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'DATABASE ERROR'
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.post('/v1/userdata', validateBody, async (req, res) => {
    try {
        const parameter = await req.body
        const response = await F_Akun_get(parameter)

        if(response.success) {
            const token = await encryptData(response.data)

            return res.status(200).json({
                data: response.data === null ? null : token
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'DATABASE ERROR'
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

module.exports = route_v1