const {readFile, writeFile} = require('./fileHandler')
const { v4: uuidv4 } = require("uuid");

function newUserStoreDetails(newUserInput,filePath){

    const User = {
      _id: uuidv4(), // Generate a unique ID
      name: newUserInput.name || null,
      username: newUserInput.username || null,
      email: newUserInput.email,
      password: newUserInput.password, // Hash password securely
      image: null, // Default to null
      role: newUserInput.role || "buyer", // Default role
      profilePicture: null, // Default to null
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      myItems: [], // Default empty array
      bidHistory: [] // Default empty array
    };
    const oldDetails = readFile(filePath)
    oldDetails.push(User)
    writeFile(filePath,oldDetails)
  
    console.log("Updated: user store details")
}

module.exports = { newUserStoreDetails }