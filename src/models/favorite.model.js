'use strict';
module.exports = (sequelize, DataTypes) => {
    const favorite = sequelize.define(
        'favorite',
        /* Properties */
        {
            id: {
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
            updatedAt: { //값이 들어가면 취소날짜
                type: DataTypes.DATE,
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
    favorite.associate = models => {

        favorite.belongsTo(models.counselor, {
            //user : consulting = 1 : N
            foreignKey: 'counselor_id',
            targetKey: 'id',
        })

        favorite.belongsTo(models.user, {
            //user : consulting = 1 : N
            foreignKey: 'user_id',
            targetKey: 'id',
        })
    };

    return favorite;
};
