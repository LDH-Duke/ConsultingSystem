'use strict';
module.exports = (sequelize, DataTypes) => {
    const favorite = sequelize.define(
        'favorite',
        /* Properties */
        {
            favorite_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            count: {
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
            updatedAt: { //값이 들어가면 취소날짜
                type: DataTypes.DATE,
                notNull: false,
                comment: ''
            },
            user_id: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
        },
        /* options */
        {
            tableName: 'favorite',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    favorite.associate = models => { };

    return favorite;
};
