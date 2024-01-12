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
                type: Datatypes.STRING(255),
                notNull: false,
                comment: ''
            },
            pay: {
                type: Datatypes.INTEGER,
                notNull: false,
                comment: ''
            },
            date: {
                type: Datatypes.DATE,
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