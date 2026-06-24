const { getAllData } = require('../lib/sheets');

module.exports = async function (req, res) {
  try {
    if (req.method !== 'GET') {
      res.status(405).json({ success: false, message: 'Method not allowed.' });
      return;
    }

    const data = await getAllData();
    res.status(200).json({ success: true, message: 'Berhasil mengambil data.', data });
  } catch (error) {
    console.error('API list error:', error.message || error);
    res.status(500).json({ success: false, message: 'Gagal mengambil daftar data.' });
  }
};