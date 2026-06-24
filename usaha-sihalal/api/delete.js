const { deleteData } = require('../lib/sheets');

module.exports = async function (req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ success: false, message: 'Method not allowed.' });
      return;
    }

    const payload = req.body || {};
    const id = typeof payload.id === 'string' ? payload.id.trim() : null;
    if (!id) {
      res.status(400).json({ success: false, message: 'ID tidak ditemukan pada request.' });
      return;
    }

    await deleteData(id);
    res.status(200).json({ success: true, message: 'Data berhasil dihapus.', data: { id } });
  } catch (error) {
    console.error('API delete error:', error.message || error);
    res.status(500).json({ success: false, message: 'Gagal menghapus data usaha.' });
  }
};