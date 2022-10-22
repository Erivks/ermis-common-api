import { DataTypes } from 'sequelize';
import db from '../../../config/db/dbConfig.js';

const ResponsibleModel = db.define('tbl_responsible', {
    id_responsible: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate: {
            max: 200
        }
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [11, 15]
        }
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: 11
        }
    }
});

export default ResponsibleModel;
