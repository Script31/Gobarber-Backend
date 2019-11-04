import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(2),
      email: Yup.string()
        .email()
        .lowercase()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const { email } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(400).json({ error: 'User already exist' });
    }
    const { id, name, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(2),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res.status(400).json({ error: 'User already exist' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
