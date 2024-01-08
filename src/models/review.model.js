'use strict';
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    'review',
    /* Properties */
    {
      review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      review_title: {
        type: DataTypes.STRING(255),
        notNull: false,
        comment: ''
      },
      review_contents: {
        type: DataTypes.STRING,
        notNull: false,
        comment: ''
      },
      review_grade: {
        type: DataTypes.INTEGER,
        notNull: false,
        comment: ''
      },
      review_date: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        notNull: false,
        comment: ''
      }
    },
    /* options */
    {
      tableName: 't_review',
      freezeTableName: false,
      underscored: false,
      timestamps: false
    }
  );

  /* Relations */
  review.associate = models => {};

  return review;
};
