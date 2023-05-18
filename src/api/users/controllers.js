import User from '../../models/users.js';

/**
 * @openapi
 * /api/users:
 *  post:
 *    description: Creation API for users
 *    parameters:
 *      - name: name
 *        in: formData
 *        type: string
 *      - name: email
 *        in: formData
 *        type: string
 *      - name: rol
 *        in: formData
 *        type: string
 *    responses:
 *      200:
 *        description: User created
 *      400:
 *        description: Bad Request
 */
const createUser = (req, res) => {
  const user = new User({
    ...req.body,
    createdAt: new Date().toISOString()
  });
  user
    .save()
    .then((user) => {
      console.log('Usuario creado:', user);
      res.status(201).json({ user });
    })
    .catch((error) => res.status(500).json({ error }));
};

const listOfUsers = (req, res) => {
  const list = User
    .find()
    .then((users) => {
      console.log('Usuarios encontrados:', users);
      res.json(users);
    })
    .catch((error) => {
      console.error('Error while getting users:', error);
      res.status(500).json({ error });
    });
};

const oneUser = (req, res) => {
  const { id } = req.params;
  User
    .findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        console.log('Usuario encontrado:', user);
        res.json(user);
      }
    })
    .catch((error) => {
      console.error('Error al buscar el usuario:', error);
      res.status(500).json({ message: "Internal server error" });
    });
};

const modificarUser = (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, rol } = req.body;
  User
    .updateOne({ _id: id }, { $set: { name, lastname, email, rol } })
    .then((users) => {
      console.log('Usuarios encontrados:', users);
      res.json(users);
    })
    .catch((error) => {
      console.error('Error while getting users:', error);
      res.status(500).json({ error });
    });
};

const eliminarUser = (req, res) => {
  const { id } = req.params;
  User
    .remove({ _id: id })
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        console.log('Usuarios eliminados:', result);
        res.json({ message: "User deleted successfully" });
      }
    })
    .catch((error) => {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ error });
    });
};

export { createUser, listOfUsers, oneUser, modificarUser, eliminarUser };