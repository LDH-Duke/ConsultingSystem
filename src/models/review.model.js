'use strict';
module.exports = (sequelize, Datatypes) => {
    const review = sequelize.define(
        'review',
        /* Properties */
        {
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            total_score: {
                type: Datatypes.INTEGER,
                notNull: false,
                comment: ''
            },
            count: {
                type: Datatypes.INTEGER,
                notNull: false,
                comment: ''
            },
        },
        /* options */
        {
            tableName: 'review',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    review.associate = models => {};

    return review;
}