'use strict';
module.exports = (sequelize, DataTypes) => {
  const rating = sequelize.define(
    'rating',
    /* Properties */
    {
      name: {
        type: DataTypes.STRING(255),
        primaryKey: true,
      },
      min_pay: {
        type: DataTypes.INTEGER,
        notNull: false,
        comment: ''
      },
      max_pay: {
        type: DataTypes.INTEGER,
        notNull: false,
        comment: ''
      },
    },
    /* options */
    {
      tableName: 'rating',
      freezeTableName: false,
      underscored: false,
      timestamps: false
    }
  );

  /* Relations */
  rating.associate = models => {};

  return rating;
};
