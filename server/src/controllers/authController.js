const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const authController = (connection) => {
  const register = async (req, res) => {
    const { email, password, dob } = req.body;
    const hashedPassword = await hashPassword(password);

    const query = 'INSERT INTO User (user_id, email, password, date_of_birth) VALUES (UUID(), ?, ?, ?)';
    connection.query(query, [email, hashedPassword, dob], (err, results) => {
      if (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Server error');
        return;
      }
      const user = {
        user_id: results.insertId,
        first_name: '',
        last_name: '',
        email,
        dob,
      };
      res.status(201).json(user);
    });
  };

  const login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM User WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Server error');
        return;
      }
      if (results.length === 0) {
        res.status(400).send('User not found');
        return;
      }

      const user = results[0];
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        res.status(400).send('Invalid credentials');
        return;
      }

      const userInfo = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        dob: user.date_of_birth,
      };

      res.json(userInfo);
    });
  };

  const ownerRegister = async (req, res) => {
    const { email, password, dob } = req.body;
    const hashedPassword = await hashPassword(password);

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
      res.status(201).json(owner);
    });
  };

  const ownerLogin = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM Owner WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching owner:', err);
        res.status(500).send('Server error');
        return;
      }
      if (results.length === 0) {
        res.status(400).send('Owner not found');
        return;
      }

      const owner = results[0];
      const isMatch = await comparePassword(password, owner.password);
      if (!isMatch) {
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

      res.json(ownerInfo);
    });
  };

  return { register, login, ownerRegister, ownerLogin };
};

module.exports = authController;
