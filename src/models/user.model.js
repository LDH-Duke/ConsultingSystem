'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    /* Properties */
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      pw: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      name: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      total_coin: {
        type: DataTypes.INTEGER,
        defaultValue: 10000,
        notNull: false,
        comment: ''
      },
      phone: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      salt: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: '',
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        notNull: false,
        comment: ''
      },
      updated_at: {
        type: DataTypes.DATE,
        notNull: false,
        comment: ''
      },
    },
    /* options */
    {
      tableName: 'user',
      freezeTableName: false,
      underscored: false,
      timestamps: false
    }
  );

  /* Relations */
  user.associate = models => {
    user.hasMany(models.consulting, {foreignKey: 'user_id', sourceKey: 'id'});
    user.hasMany(models.review_item, {foreignKey: 'user_id', sourceKey: 'id'});
    user.hasMany(models.favorite, {foreignKey: 'user_id', sourceKey: 'id'});
    user.hasMany(models.ask, {foreignKey: 'user_id', sourceKey: 'id'});
  };

  return user;
};
