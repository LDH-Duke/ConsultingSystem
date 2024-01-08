'use strict';
module.exports = (sequelize, DataTypes) => {
  const counselor = sequelize.define(
    'counselor',
    /* Properties */
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      nickname: {
        type: DataTypes.STRING,
        notNull: false,
        comment: ''
      },
      phone: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      email: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      img: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      intro: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      status: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      coin: {
        type: DataTypes.INTEGER,
        notNull: false,
        comment: ''
      },
      notice: {
        type: DataTypes.TEXT,
        notNull: false,
        comment: ''
      },
      detail: {
        type: DataTypes.TEXT,
        notNull: false,
        comment: ''
      },
      create_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        notNull: false,
        comment: ''
      },
      update_at: {
        type: DataTypes.DATE,
        notNull: false,
        comment: ''
      }
    },
    /* options */
    {
      tableName: 'counselor',
      freezeTableName: false,
      underscored: false,
      timestamps: false
    }
  );

  /* Relations */
  counselor.associate = models => {};

  return counselor;
};
