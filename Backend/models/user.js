const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "mysql",
  username: "root",
  password: "",
  database: "restful_2024",
  host: "localhost",
  port: 3306, 
});

const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 255], // Validate password length
          },
        },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 255], // Validate password length
          },
        },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
      validate: {
        isEmail: true, // Validate email format
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6, 255], // Validate password length
      },
    },
  },
  {
    timestamps: false,
    indexes: [
    {
        name: "tb_firstName",
        fields: ["firstName"],
        },
        {
        name: "tb_lastName",
        fields: ["lastName"],
    },
      {
        name: "tb_email",
        fields: ["email"],
      },
      {
        name: "tb_password",
        fields: ["password"],
      },
    ],
  }
);


User.sync({ alter: true })
  .then(() => {
    console.log("Data table created successfully");
  })
  .catch((error) => {
    console.error("Error creating Data table:", error);
  });

module.exports = User;
