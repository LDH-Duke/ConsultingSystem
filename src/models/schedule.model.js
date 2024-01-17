'use strict';
module.exports = (sequelize, DataTypes) => {
    const schedule = sequelize.define(
        'schedule',
        /* Properties */
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            start: {
                type: DataTypes.DATE,
                notNull: false,
                comment: ''
            },
            end: {
                type: DataTypes.DATE,
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
            },
            counselor_id: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            }
        },
        /* options */
        {
            tableName: 'schedule',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    schedule.associate = models => {
        schedule.belongsTo(models.counselor, {
            //user : consulting = 1 : N
            foreignKey: 'counselor_id',
            targetKey: 'id',
        })
    };

    return schedule;
};
