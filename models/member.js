"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/account_member_table.html
    var Member = sequelize.define("Account_member", {
        accountid: DataTypes.INTEGER,
        memberid: DataTypes.INTEGER,
        tag: DataTypes.STRING
        //credate: DataTypes.STRING
    }, {
        // 如果为 true 则表的名称和 model 相同，
        // 为 false MySQL创建的表名称加上复数s
        // 如果指定的表名称本就是复数形式则不变
        //freezeTableName: false
    });

    return Member;

};
