const db = require("../../connection.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  remove
};

function find() {
  return db("saved_strains").orderBy("id");
}

function findBy(filter) {
  return db("saved_strains").where(filter).orderBy("id");
  
}

function findById(id) {
    return db("saved_strains").where({ id }).first();
  }


async function add(strain) {
  try {
    const [id] = await db("saved_strains").insert(strain, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}


function remove(id) {
  return db('saved_strains').where({ id }).del();
}


