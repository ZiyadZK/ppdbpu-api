const { DataTypes } = require("sequelize");
const db = require("../config");

const M_Riwayat = db.define('data_riwayat', {
    no_riwayat: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nama_akun: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    email_akun: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    id_akun: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    aksi: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    keterangan: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    tanggal: {
        type: DataTypes.STRING(16),
        allowNull: true
    },
    waktu: {
        type: DataTypes.STRING(16),
        allowNull: true
    },
    data: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: 'data_riwayat',
    timestamps: false
})

M_Riwayat.sync()

module.exports = M_Riwayat