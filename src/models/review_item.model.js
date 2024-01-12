'use strict';
module.exports = (sequelize, Datatypes) => {
    const review_item = sequelize.define(
        'review_item',
        /* Properties */
        {
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            score: {
                type: Datatypes.INTEGER,
                notNull: false,
                comment: ''
            },
            create_at: {
                type: Datatypes.DATE,
                notNull: false,
                comment: ''
            },
            update_at: {
                type: Datatypes.DATE,
                notNull: false,
                comment: ''
            },
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
    review_item.associate = models => {};

    return review_item;
}