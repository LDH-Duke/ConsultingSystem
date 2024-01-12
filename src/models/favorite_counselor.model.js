'use strict';
module.exports = (sequelize, DataTypes) => {
    const favorite_counselor = sequelize.define(
        'favorite_counselor',
        /* Properties */
        {
            favorite_counselor_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
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
            },
            favorite_id: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            counselor_id: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
        },
        /* options */
        {
            tableName: 'favorite_counselor',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    favorite_counselor.associate = models => { };

    return favorite_counselor;
};
