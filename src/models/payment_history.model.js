'use strict';
module.exports = (sequelize, DataTypes) => {
    const payment_history = sequelize.define(
        'payment_history',
        /* Properties */
        {
            payment_history_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            category: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            pay: {
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
            },

        },
        /* options */
        {
            tableName: 'payment_history',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    payment_history.associate = models => { };

    return payment_history;
};
