'use strict';
module.exports = (sequelize, DataTypes) => {
    const review_item = sequelize.define(
        'review_item',
        /* Properties */
        {
            review_item_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            socore: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            content: {
                type: DataTypes.STRING(255),
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
            user_id: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            review_id: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            }
        },
        /* options */
        {
            tableName: 'review_item',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    review_item.associate = models => { };

    return review_item;
};
