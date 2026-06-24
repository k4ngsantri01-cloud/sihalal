const { google } = require('googleapis');
const { getGoogleAuth, getSheetId } = require('./auth');
const { toJson, formatId, createMapsLink, parseNumber } = require('./helpers');

const SHEET_NAME = 'DATA_USAHA';

async function getSheetsClient() {
  const auth = getGoogleAuth();
  await auth.authorize();
  return google.sheets({ version: 'v4', auth });
}

function mapRowToRecord(row) {
  return {
    id: row[0] || '',
    timestamp: row[1] || '',
    nama: row[2] || '',
    nama_usaha: row[3] || '',
    nama_produk: row[4] || '',
    tahun_berdiri: row[5] || '',
    no_hp: row[6] || '',
    alamat: row[7] || '',
    latitude: row[8] || '',
    longitude: row[9] || '',
    link_maps: row[10] || '',
    status_lokasi: row[11] || '',
    last_update: row[12] || '',
  };
}

async function getAllData() {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSheetId();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!A2:M`,
  });
  const rows = response.data.values || [];
  return rows.map(mapRowToRecord);
}

async function findRowIndexById(id) {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSheetId();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!A2:A`,
  });
  const rows = response.data.values || [];
  const index = rows.findIndex((row) => row[0] === id);
  return index >= 0 ? index + 2 : null;
}

async function findDuplicate(nama_usaha, no_hp, excludeId = null) {
  const data = await getAllData();
  const normalizedPhone = normalizePhone(no_hp);
  return data.find((row) => {
    const samePhone = normalizePhone(row.no_hp) === normalizedPhone;
    const sameUsaha = row.nama_usaha.toLowerCase() === nama_usaha.toLowerCase();
    const isSameId = excludeId && row.id === excludeId;
    return samePhone && sameUsaha && !isSameId;
  });
}

async function generateNextId() {
  const data = await getAllData();
  const today = new Date();
  const datePrefix = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  const existing = data
    .map((row) => row.id)
    .filter(Boolean)
    .filter((id) => id.includes(`USAHA-${datePrefix}-`))
    .map((id) => Number(id.split('-').pop() || '0'))
    .sort((a, b) => a - b);
  const nextSequence = existing.length ? existing[existing.length - 1] + 1 : 1;
  return formatId(nextSequence, today);
}

async function appendData(payload) {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSheetId();
  const timestamp = new Date().toISOString();
  const values = [
    payload.id,
    timestamp,
    payload.nama,
    payload.nama_usaha,
    payload.nama_produk,
    payload.tahun_berdiri,
    payload.no_hp,
    payload.alamat,
    payload.latitude,
    payload.longitude,
    createMapsLink(payload.latitude, payload.longitude),
    payload.status_lokasi,
    '',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_NAME}!A2:M2`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [values],
    },
  });
  return payload.id;
}

async function updateData(id, payload) {
  const rowIndex = await findRowIndexById(id);
  if (!rowIndex) {
    throw new Error('Data tidak ditemukan.');
  }
  const sheets = await getSheetsClient();
  const spreadsheetId = getSheetId();

  const existingRow = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!A${rowIndex}:M${rowIndex}`,
  });
  const existingValues = (existingRow.data.values || [])[0] || [];
  const timestamp = existingValues[1] || '';
  const lastUpdate = new Date().toISOString();
  const values = [
    id,
    timestamp,
    payload.nama,
    payload.nama_usaha,
    payload.nama_produk,
    payload.tahun_berdiri,
    payload.no_hp,
    payload.alamat,
    payload.latitude,
    payload.longitude,
    createMapsLink(payload.latitude, payload.longitude),
    payload.status_lokasi,
    lastUpdate,
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_NAME}!A${rowIndex}:M${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [values],
    },
  });
  return id;
}

async function deleteData(id) {
  const rowIndex = await findRowIndexById(id);
  if (!rowIndex) {
    throw new Error('Data tidak ditemukan.');
  }
  const sheets = await getSheetsClient();
  const spreadsheetId = getSheetId();
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    includeGridData: false,
  });
  const sheet = spreadsheet.data.sheets.find((sheet) => sheet.properties.title === SHEET_NAME);
  const sheetId = sheet ? sheet.properties.sheetId : null;
  if (sheetId === null) {
    throw new Error('Sheet DATA_USAHA tidak ditemukan.');
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: 'ROWS',
              startIndex: rowIndex - 1,
              endIndex: rowIndex,
            },
          },
        },
      ],
    },
  });
  return id;
}

module.exports = {
  getAllData,
  findRowIndexById,
  findDuplicate,
  generateNextId,
  appendData,
  updateData,
  deleteData,
};