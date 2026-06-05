import prisma from '../../lib/prisma';
import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME ?? 'Contacts';
const BATCH_INTERVAL_MS = 5000; // flush mỗi 5 giây

// Queue tạm chứa rows chờ ghi
let pendingRows: string[][] = [];
let batchTimer: NodeJS.Timeout | null = null;

function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

function formatDate(date: Date): string {
  return date.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

// Flush toàn bộ queue → ghi 1 lần duy nhất lên Sheet
async function flushToSheet() {
  if (pendingRows.length === 0) return;

  // Swap ra ngoài ngay để rows mới tiếp tục vào queue trong lúc đang ghi
  const rowsToWrite = pendingRows;
  pendingRows = [];
  batchTimer = null;

  try {
    const sheets = getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:E`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: rowsToWrite },
    });
    // eslint-disable-next-line no-console
    console.log(`[Google Sheets] Flushed ${rowsToWrite.length} row(s)`);
  } catch (err) {
    // Ghi thất bại → đẩy lại vào đầu queue để flush lần sau
    // eslint-disable-next-line no-console
    console.error('[Google Sheets] Batch write failed:', err);
    pendingRows = [...rowsToWrite, ...pendingRows];
  }
}

// Thêm 1 row vào queue, tự động set timer nếu chưa có
function scheduleAppend(row: string[]) {
  pendingRows.push(row);

  if (!batchTimer) {
    batchTimer = setTimeout(flushToSheet, BATCH_INTERVAL_MS);
  }
}

export interface CreateContactPayload {
  name: string;
  email?: string;
  phone: string;
  notes: string;
}

export const ContactService = {
  async create(payload: CreateContactPayload) {
    const contact = await prisma.contact.create({
      data: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        notes: payload.notes,
      },
    });

    // Đẩy vào queue thay vì ghi thẳng
    scheduleAppend([
      payload.name,
      payload.email ?? '',
      payload.phone,
      payload.notes,
      formatDate(contact.created_at),
    ]);

    return contact;
  },
};
