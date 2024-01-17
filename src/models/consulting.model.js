'use strict';
module.exports = (sequelize, DataTypes) => {
    const consulting = sequelize.define(
        'consulting',
        /* Properties */
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            total_time: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            pay_coin: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            is_accept: {
                type: DataTypes.BOOLEAN,
                notNull: false,
                comment: ''
            },
            is_user_reject: {
                type: DataTypes.BOOLEAN,
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
            endedAt: {
                type: DataTypes.DATE,
                notNull: false,
                comment: ''
            }

        },
        /* options */
        {
            tableName: 'consulting',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    consulting.associate = models => {
        consulting.belongsTo(models.user, {
            foreginKey: 'user_id',
            targetKey: 'id'
        })

        consulting.belongsTo(models.counselor, {
            foreginKey: 'counselor_id',
            targetKey: 'id'
        })
    };

    return consulting;
};
