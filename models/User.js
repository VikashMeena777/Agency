// In-memory user storage for demo purposes. Replace with DB in production!
const users = [];
let nextId = 1;

class User {
  constructor({ name, email, passwordHash }) {
    this.id = nextId++;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
  }

  static async create({ name, email, passwordHash }) {
    if (users.find(u => u.email === email)) {
      throw new Error("Email already exists");
    }
    const user = new User({ name, email, passwordHash });
    users.push(user);
    return user;
  }

  static async findByEmail(email) {
    return users.find(u => u.email === email);
  }

  static async findById(id) {
    return users.find(u => u.id === id);
  }
}

module.exports = User;