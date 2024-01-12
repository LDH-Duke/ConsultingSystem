'use strict';
module.exports = (sequelize, DataTypes) => {
  const consulting = sequelize.define(
    'consulting',
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
      start_time: {
        type: DataTypes.DATE,
        notNull: false,
        comment: '',
      },
      end_time: {
        type: DataTypes.DATE,
        notNull: false,
        comment: '',
      },
      is_accept: {
        type: DataTypes.TINYINT,
        notNull: false,
        comment: ''
      },
      id_user_reject: {
        type: DataTypes.TINYINT,
        notNull: false,
        comment: ''
      }
    },
    /* options */
    {
      tableName: 'consulting',
      freezeTableName: false,
      underscored: false,
      timestamps: false
    }
  );

  /* Relations */
  consulting.associate = models => {};

  return consulting;
};
