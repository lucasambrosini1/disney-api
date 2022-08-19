const sendWelcomeMail = require('../../../utils/mailService');
const { hashPassword, validatePassword } = require('../../../utils/encryptService');
const { signToken } = require('../../../utils/jwt');

module.exports = class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async save(user) {
    const {
      password, email, name, lastname,
    } = user;
    if (user === undefined) {
      throw new Error('User is not defined');
    }
    user.password = hashPassword(password);
    await sendWelcomeMail(email, name, lastname);

    return this.userRepository.save(user);
  }

  async login(username, password) {
    const user = await this.userRepository.getByUsername(username);
    if (!validatePassword(password, user.password)) {
      throw new Error('Invalid username or password');
    }
    const token = await signToken(username);
    return token;
  }

  async deleteById(id) {
    if (id === undefined) {
      throw new Error('User is not defined');
    }
    return this.userRepository.deleteById(id);
  }

  async getById(id) {
    if (id === undefined) {
      throw new Error('User is not defined');
    }
    return this.userRepository.getById(id);
  }

  async getAll() {
    return this.userRepository.getAll();
  }
};
