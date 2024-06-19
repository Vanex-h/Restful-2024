const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "mysql",
  username: "root",
  password: "",
  database: "restful_2024",
  host: "localhost",
  port: 3306,
});

const Book = sequelize.define(
  "books",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [3, 255], // Validate password length
      },
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [3, 255], // Validate author length
      },
    },
    publisher: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [3, 255], // Validate password length
      },
    },
    publicationYear: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [4, 4], // Validate publication year length
      },
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [3, 255], // Validate subject length
      },
    },
  },

  {
    timestamps: false,
    indexes: [
      {
        name: "book_name",
        fields: ["name"],
      },

      {
        name: "book_author",
        fields: ["author"],
      },
      {
        name: "book_publisher",
        fields: ["publisher"],
      },
      {
        name: "book_publicationYear",
        fields: ["publicationYear"],
      },
      {
        name: "book_subject",
        fields: ["subject"],
      },
    ],
  }
);

Book.sync({ alter: true })
  .then(() => {
    console.log("Data table created successfully");
  })
  .catch((error) => {
    console.error("Error creating Data table:", error);
  });

module.exports = Book;
