const { validatePayload } = require('../lib/validation');
const { findDuplicate, generateNextId, appendData } = require('../lib/sheets');

module.exports = async function (req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ success: false, message: 'Method not allowed.' });
      return;
    }

    const payload = req.body || {};
    const validation = validatePayload(payload);
    if (!validation.valid) {
      res.status(400).json({ success: false, message: validation.message });
      return;
    }

    const duplicate = await findDuplicate(validation.data.nama_usaha, validation.data.no_hp);
    if (duplicate) {
      res.status(409).json({ success: false, message: 'Data usaha dengan nama usaha dan nomor HP tersebut sudah ada.' });
      return;
    }

    const id = await generateNextId();
    validation.data.id = id;
    await appendData(validation.data);

    res.status(201).json({ success: true, message: 'Data berhasil disimpan.', data: { id } });
  } catch (error) {
    console.error('API create error:', error.message || error);
    res.status(500).json({ success: false, message: 'Gagal menyimpan data usaha.' });
  }
};