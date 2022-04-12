const db = require("./models");

const testUser = async () => {
  try {
    const newUser = await db.User.create({
      name: "D",
      email: "d@d.com",
      password: "1234",
    });
  } catch (err) {
    console.log(err);
  }
};

testUser();
