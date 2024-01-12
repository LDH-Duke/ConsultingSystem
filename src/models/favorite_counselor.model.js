'use strict';
module.exports = (sequelize, Datatypes) => {
    const favorite_counselor = sequelize.define(
        'favorite_counselor',
        /* Properties */
        {
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            add_date: {
                type: Datatypes.DATE,
                notNull: false,
                comment: ''
            },
        },
        /* options */
        {
            tableName: 'favorite_counselor',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    favorite_counselor.associate = models => {};

    return favorite_counselor;
}