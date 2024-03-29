'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        /* Properties */
        {
            id: {
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
            salt: {
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
            total_coin: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
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
    user.associate = models => {
        // consulting, review_item, favortie, ask
        user.hasMany(models.consulting, {
            //user : consulting = 1 : N
            sourceKey: 'id',
            foreignKey: 'user_id',
        })

        user.hasMany(models.review_item, {
            sourceKey: 'id',
            foreignKey: 'user_id',
        })

        user.hasMany(models.favorite, {
            sourceKey: 'id',
            foreignKey: 'user_id',
        })

        user.hasMany(models.ask, {
            sourceKey: 'id',
            foreignKey: 'user_id',
        })
    };

    return user;
};
