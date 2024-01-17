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
            created_at: {
                type: Datatypes.DATE,
                defaultValue: new Date(),
                notNull: false,
                comment: ''
            },
            updated_at: {
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
    review_item.associate = models => {
        review_item.belongsTo(models.user, {foreignKey: 'user_id'});
        review_item.belongsTo(models.review, {foreignKey: 'review_id'});
    };

    return review_item;
}