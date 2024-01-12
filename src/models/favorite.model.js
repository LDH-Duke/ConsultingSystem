'use strict';
module.exports = (sequelize, Datatypes) => {
    const favorite = sequelize.define(
        'favorite',
        /* Properties */
        {
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            count: {
                type: Datatypes.INTEGER,
                notNull: false,
                comment: ''
            },
        },
        /* options */
        {
            tableName: 'favorite',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    favorite.associate = models => {};

    return favorite;
}