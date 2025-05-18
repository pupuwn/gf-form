import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

const SHEET_ID = '1_loTL-vvQhDu4LcxLRJCidO7Kix21rHazWggpc3M33s'; // Ganti dengan Sheet ID kamu

async function appendToSheet(data: any) {
  const credentialsPath = path.join(process.cwd(), 'lib', 'google-credentials.json');
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const values = [[data.nama, data.perusahaan, data.posisi, (data.bentuk_kolaborasi || []).join(', '), data.evaluasi_1, data.evaluasi_2, data.evaluasi_3, data.dampak_1, data.dampak_2, data.dampak_3, new Date().toISOString()]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Feedback',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await appendToSheet(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error); // Tambahkan ini
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
