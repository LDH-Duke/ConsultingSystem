'use strict';
module.exports = (sequelize, Datatypes) => {
    const ask = sequelize.define(
        'ask',
        /* Properties */
        {
            id: {
                type: Datatypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            category: {
                type: Datatypes.STRING(255),
                notNull: false,
                comment: ''
            },
        },
        /* options */
        {
            tableName: 'ask',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    ask.associate = models => {
        ask.belongsTo(models.user, {foreignKey: 'user_id'});
        ask.belongsTo(models.counselor, {foreignKey: 'counselor_id'});
        ask.belongsTo(models.admin, {foreignKey: 'admin_id'});
    };

    return ask;
}