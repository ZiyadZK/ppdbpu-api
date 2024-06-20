const express = require('express')
const { F_Akun_getAll, F_Akun_get, F_Akun_update, F_Akun_delete, F_Akun_create } = require('../database/function/F_Akun')
const { validateBody } = require('../middleware')
const { encryptData } = require('../libs/encryptor')
const { F_Siswa_getAll, F_Siswa_create, F_Siswa_update, F_Siswa_delete, F_Siswa_get, F_Siswa_count } = require('../database/function/F_Siswa')
const { arrObj_countKey } = require('../libs/objectHandler')
const { F_Riwayat_getAll, F_Riwayat_create, F_Riwayat_delete } = require('../database/function/F_Riwayat')

const route_v1 = express.Router()

.get('/', (req, res) => {
    return res.status(200).json({
        message: 'PPDB API is Connected!'
    })
})

.get('/v1', (req, res) => {
    return res.status(200).json({
        message: 'PPDB API v1 is Connected!'
    })
})

.get('/v1/data', (req, res) => {
    return res.status(200).json({
        message: 'PPDB API of Data v1 is Connected!'
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
            error_message: response.message,
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
            error_message: response.message,
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
            error_message: response.message,
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
            error_message: response.message,
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

// DATA CALON SISWA
.get('/v1/data/siswa', async (req, res) => {
    try {

        const filters = req.query.filters
        let response

        if(!filters) {
            response = await F_Siswa_getAll()
        }else{
            response = await F_Siswa_getAll(filters)
        }
        if(response.success) {
            return res.status(200).json({
                filters,
                data: response.data,
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
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

.get('/v1/data/siswa/nisn/:nisn', async (req, res) => {
    try {
        const nisn = req.params.nisn
        const filters = req.query.filters

        let response;

        if(!filters) {
            response = await F_Siswa_get({nisn})
        }else{
            response = await F_Siswa_get({nisn, ...filters})
        }


        if(response.success) {
            return res.status(200).json({
                data: response.data
            })
        }

        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
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

.post('/v1/data/siswa', validateBody, async (req, res) => {
    try {
        const payload = await req.body

        const response = await F_Siswa_create(payload)

        if(response.success) {
            return res.status(200).json({
                message: 'Sukses menambahkan data siswa!'
            })
        }

        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
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

.put('/v1/data/siswa', validateBody, async (req, res) => {
    try {

        const nisn = await req.body.nisn
        const payload = await req.body.payload

        const response = await F_Siswa_update(nisn, payload)

        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil mengubah data siswa!'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
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

.delete('/v1/data/siswa', validateBody, async (req, res) => {
    try {

        const nisn = await req.body.nisn
        console.log(nisn)

        const response = await F_Siswa_delete(nisn)

        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil menghapus data siswa tersebut!'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
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

// USERDATA
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
            error_message: response.message,
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

// DASHBOARD
.get('/v1/dashboard/rekap', async (req, res) => {
    try {

        let response = {}
        // Data Rekap
        const responseSiswa = await F_Siswa_getAll()
        if(responseSiswa.success) {
            if(responseSiswa.data.length > 0) {
                // Filter Tahun
                const dataTahun = arrObj_countKey(responseSiswa.data, 'tahun_masuk')
                // console.log(responseSiswa)

                Object.keys(dataTahun).forEach(tahun => {
                    response[tahun] = {
                        total_terdaftar: dataTahun[tahun],
                        total_daftarUlang: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['daftar_ulang'] == 1).length,
                        total_terdaftar_tahap1: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['tahap'] == 1).length,
                        total_daftarUlang_tahap1: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['tahap'] == 1).length,
                        total_terdaftar_tahap2: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['tahap'] == 2).length,
                        total_daftarUlang_tahap2: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['tahap'] == 2).length,

                        total_terdaftar_tkj: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['id_rombel'] == 'TEKNIK JARINGAN KOMPUTER DAN TELEKOMUNIKASI').length,
                        total_terdaftar_dpib: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['id_rombel'] == 'DESAIN PEMODELAN DAN INFORMASI BANGUNAN').length,
                        total_terdaftar_geo: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['id_rombel'] == 'TEKNIK GEOSPASIAL').length,
                        total_terdaftar_tkr: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['id_rombel'] == 'TEKNIK OTOMOTIF').length,
                        total_terdaftar_titl: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['id_rombel'] == 'TEKNIK KETENAGALISTRIKAN').length,
                        total_terdaftar_tpm: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['id_rombel'] == 'TEKNIK MESIN').length,

                        total_daftarUlang_tkj: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['id_rombel'] == 'TEKNIK JARINGAN KOMPUTER DAN TELEKOMUNIKASI').length,
                        total_daftarUlang_dpib: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['id_rombel'] == 'DESAIN PEMODELAN DAN INFORMASI BANGUNAN').length,
                        total_daftarUlang_geo: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['id_rombel'] == 'TEKNIK GEOSPASIAL').length,
                        total_daftarUlang_tkr: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['id_rombel'] == 'TEKNIK OTOMOTIF').length,
                        total_daftarUlang_titl: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['id_rombel'] == 'TEKNIK KETENAGALISTRIKAN').length,
                        total_daftarUlang_tpm: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] == tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['id_rombel'] == 'TEKNIK MESIN').length,

                        total_terdaftar_kategori_kejuaraan: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['kategori'] == 'PRESTASI KEJUARAAN').length,
                        total_terdaftar_kategori_ketm: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['kategori'] == 'KETM').length,
                        total_terdaftar_kategori_rapor: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['kategori'] == 'PRESTASI RAPOR UMUM').length,
                        total_terdaftar_kategori_lain: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['kategori'] != 'KETM' && siswa['kategori'] != 'PRESTASI RAPOR UMUM' && siswa['kategori'] != 'PRESTASI KEJUARAAN').length,

                        total_daftarUlang_kategori_kejuaraan: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['kategori'] == 'PRESTASI KEJUARAAN').length,
                        total_daftarUlang_kategori_ketm: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['kategori'] == 'KETM').length,
                        total_daftarUlang_kategori_rapor: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['kategori'] == 'PRESTASI RAPOR UMUM').length,
                        total_daftarUlang_kategori_lain: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['kategori'] != 'KETM' && siswa['kategori'] != 'PRESTASI RAPOR UMUM' && siswa['kategori'] != 'PRESTASI KEJUARAAN').length,

                        total_daftarUlang_jk_laki: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['jk_siswa'] == 'Laki - laki').length,
                        total_daftarUlang_jk_perempuan: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['jk_siswa'] == 'Perempuan').length,

                        total_terdaftar_jk_laki: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['jk_siswa'] == 'Laki - laki').length,
                        total_terdaftar_jk_perempuan: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['jk_siswa'] == 'Perempuan').length,

                        total_daftarUlang_tinggal_ortu: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['tinggal'] == 'Bersama Orang Tua').length,
                        total_daftarUlang_tinggal_kos: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['tinggal'] == 'Kos').length,
                        total_daftarUlang_tinggal_wali: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['tinggal'] == 'Wali').length,

                        total_terdaftar_tinggal_ortu: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['tinggal'] == 'Bersama Orang Tua').length,
                        total_terdaftar_tinggal_kos: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['tinggal'] == 'Kos').length,
                        total_terdaftar_tinggal_wali: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['tinggal'] == 'Wali').length,

                        total_daftarUlang_transport_angkut: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['alat_transport'] == 'ANGKUTAN UMUM').length,
                        total_daftarUlang_transport_antar: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['alat_transport'] == 'ANTAR JEMPUT SEKOLAH').length,
                        total_daftarUlang_transport_jalan: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['alat_transport'] == 'JALAN KAKI').length,
                        total_daftarUlang_transport_motor: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['alat_transport'] == 'MOTOR').length,
                        total_daftarUlang_transport_sepeda: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['daftar_ulang'] == 1).filter(siswa => siswa['alat_transport'] == 'SEPEDA').length,

                        total_terdaftar_transport_angkut: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['alat_transport'] == 'ANGKUTAN UMUM').length,
                        total_terdaftar_transport_antar: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['alat_transport'] == 'ANTAR JEMPUT SEKOLAH').length,
                        total_terdaftar_transport_jalan: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['alat_transport'] == 'JALAN KAKI').length,
                        total_terdaftar_transport_motor: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['alat_transport'] == 'MOTOR').length,
                        total_terdaftar_transport_sepeda: responseSiswa.data.filter(siswa => siswa['tahun_masuk'] === tahun).filter(siswa => siswa['alat_transport'] == 'SEPEDA').length
                    }
                })


                return res.status(200).json({
                    data: response
                })
                
            }else{
                return res.status(200).json({
                    data: null
                })
            }
        }

        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: responseSiswa.message,
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

// LOG RIWAYAT
.get('/v1/data/riwayat', async (req, res) => {
    try {
        const response = await F_Riwayat_getAll()
        if(response.success) {
            return res.status(200).json({
                data: response.data
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
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

.post('/v1/data/riwayat', validateBody, async (req, res) => {
    try {
        const payload = await req.body

        const response = await F_Riwayat_create(payload)

        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil membuat log!'
            })
        }

        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
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

.delete('/v1/data/riwayat', validateBody, async (req, res) => {
    try {

        const id_riwayat = await req.body.id_riwayat

        const response = await F_Riwayat_delete(id_riwayat)

        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil menghapus data riwayat!'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
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