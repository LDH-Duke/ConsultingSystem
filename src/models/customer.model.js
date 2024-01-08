'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define(
    'customer',
    /* Properties */
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customer_account: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      customer_password: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      customer_nm: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      customer_email: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      customer_address: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      customer_phone: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      customer_mileage: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      customer_createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        notNull: false,
        comment: ''
      },
      customer_updatedAt: {
        type: DataTypes.DATE,
        notNull: false,
        comment: ''
      }
    },
    /* options */
    {
      tableName: 't_customer',
      freezeTableName: false,
      underscored: false,
      timestamps: false
    }
  );

  /* Relations */
  customer.associate = models => {};

  return customer;
};
