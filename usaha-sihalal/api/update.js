const { validatePayload } = require('../lib/validation');
const { findDuplicate, updateData } = require('../lib/sheets');

module.exports = async function (req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ success: false, message: 'Method not allowed.' });
      return;
    }

    const payload = req.body || {};
    const validation = validatePayload(payload, true);
    if (!validation.valid) {
      res.status(400).json({ success: false, message: validation.message });
      return;
    }

    const duplicate = await findDuplicate(validation.data.nama_usaha, validation.data.no_hp, validation.data.id);
    if (duplicate) {
      res.status(409).json({ success: false, message: 'Data usaha duplikat ditemukan untuk nama usaha dan nomor HP.' });
      return;
    }

    await updateData(validation.data.id, validation.data);
    res.status(200).json({ success: true, message: 'Data berhasil diperbarui.', data: { id: validation.data.id } });
  } catch (error) {
    console.error('API update error:', error.message || error);
    res.status(500).json({ success: false, message: 'Gagal memperbarui data usaha.' });
  }
};