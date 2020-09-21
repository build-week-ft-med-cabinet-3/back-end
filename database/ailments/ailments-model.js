const db = require("../../connection.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
};

function find() {
  return db("ailments").orderBy("id");
}

function findBy(filter) {
  return db("ailments").where(filter).orderBy("id");
  
}

function findById(id) {
    return db("ailments").where({ id }).first();
  }


async function add(user) {
  try {
    const [id] = await db("ailments").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}


