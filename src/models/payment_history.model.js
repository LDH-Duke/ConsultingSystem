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
            amount: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            status: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            method: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            product: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            user_id: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            user_name: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            counselor_id: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            counselor_name: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            orderedAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                notNull: false,
                comment: ''
            },
            paidAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
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
