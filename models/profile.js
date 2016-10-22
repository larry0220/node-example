"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/profile_table.html
    var Profile = sequelize.define("Profile", {
        name: DataTypes.STRING,
        birthday: DataTypes.STRING,
        sex: DataTypes.STRING,
        role: DataTypes.STRING,
        image: DataTypes.TEXT
        //credate: DataTypes.STRING
    }, {
      classMethods: {
        associate: function(models) {
          Profile.belongsTo(models.Account, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    });

    return Profile;
};