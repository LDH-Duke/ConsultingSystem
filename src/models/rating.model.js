'use strict';
module.exports = (sequelize, DataTypes) => {
    const rating = sequelize.define(
        'rating',
        /* Properties */
        {
            name: {
                type: DataTypes.STRING(255),
                primaryKey: true,
            },
            min_pay: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            max_pay: {
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
            }
        },
        /* options */
        {
            tableName: 'rating',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    rating.associate = models => { };

    return rating;
};
