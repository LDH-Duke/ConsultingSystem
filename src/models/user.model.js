'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        /* Properties */
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            pw: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            name: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            phone: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            coin: {
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
            tableName: 'user',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    user.associate = models => { };

    return user;
};
