'use strict';
module.exports = (sequelize, DataTypes) => {
    const room = sequelize.define(
        'room',
        /* Properties */
        {
            room_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            during: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            coin: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            invite_id: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            invite_access: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            user_id: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            counselor_id: {
                type: DataTypes.INTEGER,
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
            tableName: 'room',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    room.associate = models => { };

    return room;
};
