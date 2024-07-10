const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return (await bcrypt.hash(password, salt)).substring(0, 50);
};

const comparePassword = async (password, hash) => {
  const hashedInputPassword = (await bcrypt.hash(password, hash.substring(0, 29))).substring(0, 50);
  return hashedInputPassword === hash;
};

const authController = (connection) => {
  const register = async (req, res) => {
    const { email, password, firstName, lastName, dob } = req.body;
    const hashedPassword = await hashPassword(password);
    const userId = uuidv4();

    console.log('Register attempt: ', email);
    const query = 'INSERT INTO User (user_id, first_name, last_name, email, password, date_of_birth) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [userId, firstName, lastName, email, hashedPassword, dob], (err, results) => {
      if (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Server error');
        return;
      }
      const user = {
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        email,
        dob,
      };
      console.log('User registered successfully:', user);
      res.status(201).json(user);
    });
  };

  const login = (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt: ', email);
    const query = 'SELECT user_id, first_name, last_name, password, date_of_birth FROM User WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Server error');
        return;
      }
      console.log('Query results:', results);

      if (results.length === 0) {
        console.log('User not found:', email);
        res.status(400).send('User not found');
        return;
      }

      const user = results[0];
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        console.log(user.first_name, 'entered wrong password.');
        res.status(400).send('Invalid credentials');
        return;
      }

      const userInfo = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: email,
        dob: user.date_of_birth,
      };

      console.log('User logged in successfully:', userInfo);
      res.json(userInfo);
    });
  };

  const ownerRegister = async (req, res) => {
    const { email, password, dob } = req.body;
    const hashedPassword = await hashPassword(password);

    console.log('Owner register attempt: ', email);
    const query = 'INSERT INTO Owner (user_id, email, password, date_of_birth, status) VALUES (UUID(), ?, ?, ?, ?)';
    connection.query(query, [email, hashedPassword, dob, 'active'], (err, results) => {
      if (err) {
        console.error('Error creating owner:', err);
        res.status(500).send('Server error');
        return;
      }
      const owner = {
        user_id: results.insertId,
        first_name: '',
        last_name: '',
        email,
        dob,
      };
      console.log('Owner registered successfully:', owner);
      res.status(201).json(owner);
    });
  };

  const ownerLogin = (req, res) => {
    const { email, password } = req.body;

    console.log('Owner login attempt: ', email);
    const query = 'SELECT * FROM Owner WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching owner:', err);
        res.status(500).send('Server error');
        return;
      }
      console.log('Query results:', results);

      if (results.length === 0) {
        console.log('Owner not found:', email);
        res.status(400).send('Owner not found');
        return;
      }

      const owner = results[0];
      const isMatch = await comparePassword(password, owner.password);
      if (!isMatch) {
        console.log(owner.first_name, 'entered wrong password.');
        res.status(400).send('Invalid credentials');
        return;
      }

      const ownerInfo = {
        user_id: owner.user_id,
        first_name: owner.first_name,
        last_name: owner.last_name,
        email: owner.email,
        dob: owner.date_of_birth,
      };

      console.log('Owner logged in successfully:', ownerInfo);
      res.json(ownerInfo);
    });
  };

  return { register, login, ownerRegister, ownerLogin };
};

module.exports = authController;
