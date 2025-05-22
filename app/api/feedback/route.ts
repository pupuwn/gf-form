import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parsing body request
    const body = await req.json();
    console.log('Received data:', body);

    // Pastikan path ada dalam data
    if (!body.path) {
      console.error('Missing path parameter');
      return NextResponse.json({ success: false, message: 'Missing path parameter' }, { status: 400 });
    }

    const formattedData = {
      path: body.path,
      nama: body.nama || '',
      perusahaan: body.perusahaan || '',
      posisi: body.posisi || '',

      bentuk_kolaborasi: Array.isArray(body.bentuk_kolaborasi) ? body.bentuk_kolaborasi.join(', ') : body.bentuk_kolaborasi || '',
      evaluasi_1: body.evaluasi_1 || '',
      evaluasi_2: body.evaluasi_2 || '',
      evaluasi_3: body.evaluasi_3 || '',
      dampak_1: body.dampak_1 || '',
      dampak_2: body.dampak_2 || '',
      dampak_3: body.dampak_3 || '',
    };

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      console.error('GOOGLE_SCRIPT_URL env variable not set');
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }

    console.log('Sending data to Google Script:', formattedData);
    console.log('Script URL:', scriptUrl);

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formattedData).toString(),
    });

    const responseText = await response.text();
    console.log('Google Script response:', responseText);

    if (!response.ok) {
      throw new Error(`Google Script error: ${responseText}`);
    }

    return NextResponse.json({
      success: true,
      message: responseText,
    });
  } catch (error: any) {
    console.error('Error in feedback API:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
