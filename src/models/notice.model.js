'use strict';
module.exports = (sequelize, DataTypes) => {
  const notice = sequelize.define(
    'notice',
    /* Properties */
    {
      notice_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      notice_title: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      notice_contents: {
        type: DataTypes.STRING,
        notNull: false,
        comment: ''
      },
      notice_seq: {
        type: DataTypes.INTEGER,
        notNull: false,
        comment: ''
      },
      notice_createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        notNull: false,
        comment: ''
      },
      notice_updatedAt: {
        type: DataTypes.DATE,
        notNull: false,
        comment: ''
      }
    },
    /* options */
    {
      tableName: 't_notice',
      freezeTableName: false,
      underscored: false,
      timestamps: false
    }
  );

  /* Relations */
  notice.associate = models => {};

  return notice;
};
