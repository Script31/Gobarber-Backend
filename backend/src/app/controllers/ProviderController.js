import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async store(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatr_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
}
export default new ProviderController();
