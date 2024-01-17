'use strict';
module.exports = (sequelize, DataTypes) => {
    const cash_history = sequelize.define(
        'cash_history',
        /* Properties */
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            payment_key: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            type: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            total_amount: {
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
            order_id: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            order_name: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            pg_data: {
                type: DataTypes.JSON,
                notNull: false,
                comment: ''
            },
            // user_name: {
            //     type: DataTypes.STRING(255),
            //     notNull: false,
            //     comment: ''
            // },
            requestedAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                notNull: false,
                comment: ''
            },
            approvedAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                notNull: false,
                comment: ''
            },
        },
        /* options */
        {
            tableName: 'cash_history',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    cash_history.associate = models => { };

    return cash_history;
};
