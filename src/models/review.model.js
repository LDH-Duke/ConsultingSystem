'use strict';
module.exports = (sequelize, DataTypes) => {
    const review = sequelize.define(
        'review',
        /* Properties */
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            total_socore: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            count: {
                type: DataTypes.INTEGER,
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
            counselor_id: {
                type: DataTypes.INTEGER,
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
    review.associate = models => {
        review.hasMany(models.review_item, {
            //user : consulting = 1 : N
            sourceKey: 'id',
            foreignKey: 'review_id',
        })

        review.belongsTo(models.counselor, {
            //user : consulting = 1 : N
            target: 'id',
            foreignKey: 'counselor_id',
        })
    };

    return review;
};
