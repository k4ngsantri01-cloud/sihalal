const { getAllData } = require('../lib/sheets');

module.exports = async function (req, res) {
  try {
    if (req.method !== 'GET') {
      res.status(405).json({ success: false, message: 'Method not allowed.' });
      return;
    }

    const id = req.query.id;
    if (!id) {
      res.status(400).json({ success: false, message: 'ID tidak ditemukan pada request.' });
      return;
    }

    const data = await getAllData();
    const item = data.find((record) => record.id === id);
    if (!item) {
      res.status(404).json({ success: false, message: 'Data tidak ditemukan.' });
      return;
    }

    res.status(200).json({ success: true, message: 'Berhasil mengambil detail data.', data: item });
  } catch (error) {
    console.error('API detail error:', error.message || error);
    res.status(500).json({ success: false, message: 'Gagal mengambil detail data.' });
  }
};