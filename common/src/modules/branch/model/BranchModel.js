import BusinessModel from '../../business/model/BusinessModel.js';
import { DataTypes } from 'sequelize';
import db from '../../../config/db/dbConfig.js';

const BranchModel = db.define('tbl_branch', {
    id_branch: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cnpj: {
        type: DataTypes.CHAR,
        allowNull: false,
        unique: true,
        validate: {
            len: 14
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 200
        }
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 100
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 100
        }
    },
    state: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate: {
            max: 2
        }
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            max: 150
        }
    }
},
    { paranoid: true, timestamps: true }
);

BusinessModel.hasMany(BranchModel, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: 'id_business'
});

BranchModel.Business = BranchModel.belongsTo(BusinessModel, {
    as: 'business',
    foreignKey: 'id_business'
});

export default BranchModel;
