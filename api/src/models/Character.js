const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

/* 
id
name
species
origin
image
created 
*/

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("character", {
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type: DataTypes.STRING,
      allowNull: true, 
    },
    species:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    origin:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    image:{
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'Default image'
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  },
  {
    timestamps: true,
    createdAt: false,
    updatedAt: false
  });
};
