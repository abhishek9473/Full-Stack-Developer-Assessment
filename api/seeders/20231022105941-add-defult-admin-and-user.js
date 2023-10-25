"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seedData = [
      {
        name: "Abhishek sinha",
        email: "abhishek@gmail.com",
        role: "admin",
        password: await hashPassword("1234"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ravi kumar",
        email: "ravi@gmail.com",
        role: "user",
        password: await hashPassword("1234"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("users", seedData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      "users",
      {
        email: {
          [Sequelize.Op.in]: ["abhishek@gmail.com", "ravi@gmail.com"],
        },
      },
      {}
    );
  },
};

async function hashPassword(password) {
  const saltRounds = 10; // Number of salt rounds to use

  // Generate a salt value
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
