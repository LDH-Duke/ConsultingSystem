'use strict';
module.exports = (sequelize, Datatypes) => {
    const admin = sequelize.define(
        'admin',
        /* Properties */
        {
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        },
        /* options */
        {
            tableName: 'admin',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    admin.associate = models => {};

    return admin;
}