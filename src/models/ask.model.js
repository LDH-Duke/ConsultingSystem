'use strict';
module.exports = (sequelize, DataTypes) => {
    const ask = sequelize.define(
        'ask',
        /* Properties */
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            category: {
                type: DataTypes.ENUM('UserAdmin', 'UserCounselor', 'CounselorAdmin'),
                notNull: false,
                comment: ''
            },
            writer: {
                type: DataTypes.ENUM('고객', '상담사', '관리자'),
                notNull: false,
                comment: ''
            },
            title: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            content: {
                type: DataTypes.STRING(255),
                notNull: false,
                comment: ''
            },
            group_id: {
                type: DataTypes.INTEGER,
                notNull: false,
                comment: ''
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                notNull: false,
                comment: ''
            },
            updatedAt: {
                type: DataTypes.DATE,
                notNull: false,
                comment: ''
            }
        },
        /* options */
        {
            tableName: 'ask',
            freezeTableName: false,
            underscored: false,
            timestamps: false
        }
    );

    /* Relations */
    ask.associate = models => {
        ask.belongsTo(models.user, {
            //user : consulting = 1 : N
            foreignKey: 'user_id',
            targetKey: 'id',
        })

        ask.belongsTo(models.counselor, {
            //user : consulting = 1 : N
            foreignKey: 'counselor_id',
            targetKey: 'id',
        })

    };

    return ask;
};
