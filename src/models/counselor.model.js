'use strict';
module.exports = (sequelize, DataTypes) => {
    const counselor = sequelize.define(
        'counselor',
        /* Properties */
        {
            counselor_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            nickname: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            pw: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            salt: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: '',
            },
            email: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            phone: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            rating: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            status: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            coin: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            img: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            intro: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            notice: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            detail: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                notNull: false,
                comment: ''
            },
            updatedAt: {
                type: DataTypes.DATE,
                notNull: false,
                comment: ''
            }
        },
        /* options */
        {
            tableName: 'counselor',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    counselor.associate = models => { };

    return counselor;
};
