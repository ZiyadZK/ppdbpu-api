const { DataTypes } = require("sequelize");
const db = require("../config");

const M_Akun = db.define('data_akun', {
    id_akun: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    id_pegawai_akun: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'id_pegawai_akun'
    },
    nama_akun: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'nama_akun'
    },
    email_akun: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'email_akun'
    },
    password_akun: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role_akun: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    tableName: 'data_akun'
})

M_Akun.sync({ alter: true })

module.exports = M_Akun