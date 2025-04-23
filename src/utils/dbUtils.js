import database from "../db.js";

export const syncDatabase = async () => {
  try {
    await database.sync({ force: true });
    console.log("Database synchronized correctly");
  } catch (e) {
    console.error("Error trying to sync", e);
  }
};

export const authenticateDatabase = async () => {
  try {
    await database.authenticate({ force: true });
    console.log("Postgres connected");
  } catch (e) {
    console.error("Error trying to sync database", e);
  }
};
