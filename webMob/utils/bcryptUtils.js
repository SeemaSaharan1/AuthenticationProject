const bcrypt = require('bcryptjs');

// Function to hash a password asynchronously
exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);  // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Password hashing error');
    }
};

// Function to compare a password with a hashed password
exports.comparePasswords = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Password comparison error');
    }
};
