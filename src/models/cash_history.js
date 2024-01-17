'use strict';
module.exports = (sequelize, Datatypes) => {
    const cash_history = sequelize.define(
        'cash_history',
        /* Properties */
        {
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            payment_key: {
                type: Datatypes.STRING(255),
                notNull: false,
                comment: ''
            },
            type: {
                type: Datatypes.ENUM('NORMAL', 'BILLING', 'BRANDPAY'),
                notNull: false,
                comment: '',
            },
            order_id: {
                type: Datatypes.STRING(255),
                notNull: false,
                comment: ''
            },
            order_name: {
                type: Datatypes.STRING(255),
                notNull: false,
                comment: ''
            },
            method: {
                type: Datatypes.ENUM('카드', '가상계좌', '간편결제', '휴대폰', '계좌이체', '문화상품권', '도서문화상품권', '게임문화상품권'),
                notNull: false,
                comment: ''
            },
            total_amount: {
                type: Datatypes.INTEGER,
                notNull: false,
                comment: ''
            },
            stauts: {
                type: Datatypes.ENUM('READY', 'IN_PROGRESS', 'WAITING_FOR_DEPOSIT', 'DONE', 'CANCELED', 'PARTIAL_CANCELED', 'ABORTED', 'EXPIRED'),
                notNull: false,
                comment: ''
            },
            requested_at: {
                type: Datatypes.DATE,
                notNull: false,
                comment: ''
            },
            approved_at: {
                type: Datatypes.DATE,
                notNull: false,
                comment: ''
            },
            pg_data: {
                type: Datatypes.JSON,
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
            }
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
    cash_history.associate = models => {};

    return cash_history;
}