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
    ask.associate = models => {};

    return ask;
}