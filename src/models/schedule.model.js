'use strict';
module.exports = (sequelize, DataTypes) => {
  const schedule = sequelize.define(
    'schedule',
    /* Properties */
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      start: {
        type: DataTypes.DATE,
        notNull: false,
        comment: ''
      },
      end: {
        type: DataTypes.DATE,
        notNull: false,
        comment: ''
      },
    },
    /* options */
    {
      tableName: 'schedule',
      freezeTableName: false,
      underscored: false,
      timestamps: false
    }
  );

  /* Relations */
  schedule.associate = models => {};

  return schedule;
};
