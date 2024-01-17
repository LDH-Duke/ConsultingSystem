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
    admin.associate = models => {
        admin.hasMany(models.ask, {foreignKey: 'admin_id', sourceKey: 'id'});
    };

    return admin;
}