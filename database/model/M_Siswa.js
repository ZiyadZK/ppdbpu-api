const { DataTypes } = require("sequelize");
const db = require("../config");


const M_Siswa = db.define('data_siswa', {
    nomor_reg: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    nisn: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
    },
    nis: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    id_rombel: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    nama_siswa: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    jk_siswa: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    tempat_lahir_siswa: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    tgl_lahir_siswa: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    alamat_siswa: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    no_telp_siswa: {
        type: DataTypes.STRING(13),
        allowNull: true
    },
    asal_sekolah: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    no_ijazah: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    tgl_ijazah: {
        type: DataTypes.STRING(12),
        allowNull: true
    },
    no_skhun: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    no_kk: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    agama: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    status_anak: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    jml_saudara: {
        type: DataTypes.STRING(2),
        allowNull: true
    },
    alamat_email_siswa: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    password_siswa: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    kebutuhan_khusus: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    bantuanp: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    kategori: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    keterangan_kategori: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    foto: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    nik: {
        type: DataTypes.STRING(16),
        allowNull: true
    },
    tahun_masuk: {
        type: DataTypes.STRING(4),
        allowNull: true
    },
    alat_transport: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    tinggi_badan: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    berat_badan: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    jarak: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    lingkar_kepala: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    waktu_dari_rumah_ke_sekolah: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    hobby: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    cita_cita: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    anak_ke_berapa: {
        type: DataTypes.STRING(2),
        allowNull: true
    },
    tinggal: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    nama_ayah: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    no_telp_ayah: {
        type: DataTypes.STRING(13),
        allowNull: true
    },
    kebutuhan_ayah: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    pekerjaan_ayah: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    pendidikan_ayah: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    penghasilan_ayah: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    nama_ibu: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    no_telp_ibu: {
        type: DataTypes.STRING(13),
        allowNull: true
    },
    kebutuhan_ibu: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    pekerjaan_ibu: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    pendidikan_ibu: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    penghasilan_ibu: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    nama_wali: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    kebutuhan_wali: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    no_telp_wali: {
        type: DataTypes.STRING(13),
        allowNull: true
    },
    pekerjaan_wali: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    pendidikan_wali: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    penghasilan_wali: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    hubungan_wali: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    nik_ayah: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    tempat_lahir_ayah: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    tanggal_lahir_ayah: {
        type: DataTypes.STRING(12),
        allowNull: true
    },
    nik_ibu: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    tempat_lahir_ibu: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    tanggal_lahir_ibu: {
        type: DataTypes.STRING(12),
        allowNull: true
    },
    nik_wali: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    tempat_lahir_wali: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    tanggal_lahir_wali: {
        type: DataTypes.STRING(12),
        allowNull: true
    },
    aktif: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    daftar_ulang: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    tahap: {
        type: DataTypes.STRING(1),
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'data_siswa'
})

M_Siswa.sync()

module.exports = M_Siswa