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
        type: DataTypes.STRING(255),
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
      pw: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      salt: {
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
      consulting_count: {
        type: DataTypes.INTEGER,
        notNull: false,
        comment: ''
      },
      is_accept: {
        type: DataTypes.TINYINT,
        notNull: false,
        comment: ''
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
  counselor.associate = models => {
    counselor.hasMany(models.consulting, {foreignKey: 'counselor_id', sourceKey: 'id'});
    counselor.hasMany(models.review, {foreignKey: 'counselor_id', sourceKey: 'id'});
    counselor.hasMany(models.favorite, {foreignKey: 'counselor_id', sourceKey: 'id'});
    counselor.hasMany(models.ask, {foreignKey: 'counselor_id', sourceKey: 'id'});
    counselor.hasMany(models.schedule, {foreignKey: 'counselor_id', sourceKey: 'id'});
  };

  return counselor;
};
