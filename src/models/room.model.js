'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define(
    'room',
    /* Properties */
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      create_date: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        comment: ''
      },
      call_time: {
        type: DataTypes.TIME,
        notNull: false,
        comment: ''
      },
      pay_coin: {
        type: DataTypes.INTEGER,
        notNull: false,
        comment: ''
      },
      invite_id: {
        type: DataTypes.INTEGER,
        notNull: false,
        comment: ''
      },
      invite_access: {
        type: DataTypes.TINYINT,
        notNull: false,
        comment: ''
      }
    },
    /* options */
    {
      tableName: 'room',
      freezeTableName: false,
      underscored: false,
      timestamps: false
    }
  );

  /* Relations */
  room.associate = models => {};

  return room;
};
