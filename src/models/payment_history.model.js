'use strict';
module.exports = (sequelize, Datatypes) => {
    const payment_history = sequelize.define(
        'payment_history',
        /* Properties */
        {
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            category: {
                type: Datatypes.ENUM('CONSULTING', 'COIN'),
                notNull: false,
                comment: ''
            },
            order_date: {
                type: Datatypes.DATE,
                notNull: false,
                comment: ''
            },
            payment_date: {
                type: Datatypes.DATE,
                notNull: false,
                comment: ''
            },
            status: {
                type: Datatypes.ENUM('CANCEL', 'DONE', 'REFUND'),
                notNull: false,
                comment: ''
            },
            method: {
                type: Datatypes.ENUM('CARD', 'COIN'),
                notNull: false,
                comment: ''
            },
            product: {
                type: Datatypes.STRING(255),
                notNull: false,
                comment: ''
            },
            user_name: {
                type: Datatypes.STRING(255),
                notNull: false,
                comment: ''
            },
            user_id: {
                type: Datatypes.INTEGER,
                notNull: false,
                comment: ''
            },
            counselor_name: {
                type: Datatypes.STRING(255),
                notNull: false,
                comment: ''
            },
            counselor_id: {
                type: Datatypes.INTEGER,
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
    payment_history.associate = models => {};

    return payment_history;
}