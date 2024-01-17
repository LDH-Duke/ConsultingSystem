'use strict';
module.exports = (sequelize, Datatypes) => {
    const coin_history = sequelize.define(
        'coin_history',
        /* Properties */
        {
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            category: {
                type: Datatypes.ENUM('CONSULTING', 'EXCHANGE'),
                notNull: false,
                comment: ''
            },
            amount: {
                type: Datatypes.INTEGER,
                notNull: false,
                comment: '',
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
                type: Datatypes.ENUM('SUCCESS', 'FAILED', 'DONE', 'CANCEL'),
                notNull: false,
                comment: ''
            },
            method: {
                type: Datatypes.STRING(255),
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
            tableName: 'coin_history',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    coin_history.associate = models => {};

    return coin_history;
}