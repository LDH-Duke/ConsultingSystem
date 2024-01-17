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
            created_at: {
                type: Datatypes.DATE,
                defaultValue: new Date(),
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
    favorite.associate = models => {
        favorite.belongsTo(models.user, {foreignKey: 'user_id'});
        favorite.belongsTo(models.counselor, {foreignKey: 'counselor_id'});
    };

    return favorite;
}