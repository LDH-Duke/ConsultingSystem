'use strict';
module.exports = (sequelize, DataTypes) => {
    const review_item = sequelize.define(
        'review_item',
        /* Properties */
        {
            id: {
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
    review_item.associate = models => {
        review_item.belongsTo(models.user, {
            foreignKey: 'user_id',
            targetKey: 'id'
        })

        review_item.belongsTo(models.review, {
            foreignKey: 'review_id',
            targetKey: 'id'
        })
    };

    return review_item;
};
