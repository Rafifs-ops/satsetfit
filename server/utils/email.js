const { BrevoClient, BrevoError, UnauthorizedError, TooManyRequestsError } = require('@getbrevo/brevo');
// const nodemailer = require('nodemailer');

/**
 * Mengirim email berisi kode OTP untuk Verifikasi Email atau Reset Password.
 */
exports.sendOtpEmail = async ({ to, otp, purpose, username = 'User' }) => {
    const isVerify = purpose === 'VERIFY_EMAIL';
    const subject = isVerify
        ? 'Verifikasi Email Akun SatSetFit Anda'
        : 'Kode OTP Reset Password SatSetFit';

    const title = isVerify ? 'Verifikasi Email Akun' : 'Reset Password Akun';
    const description = isVerify
        ? 'Terima kasih telah mendaftar di <strong>SatSetFit</strong>! Gunakan kode OTP 6 angka berikut untuk memverifikasi alamat email Anda agar dapat login:'
        : 'Kami menerima permintaan untuk mereset password akun Anda di <strong>SatSetFit</strong>. Gunakan kode OTP 6 angka berikut untuk membuat password baru:';

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #092635; color: #9EC8B9;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #092635; padding: 40px 10px;">
            <tr>
                <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #1C1678; border-radius: 16px; border: 1px solid rgba(92, 131, 116, 0.4); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <!-- Header Gradient -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #8576FF 0%, #1C1678 100%); padding: 30px 20px; text-align: center;">
                                <h1 style="margin: 0; font-size: 26px; color: #A3FFD6; font-weight: 700; letter-spacing: 1px;">SatSetFit</h1>
                                <p style="margin: 5px 0 0; font-size: 14px; color: #9EC8B9; opacity: 0.85;">Get to know about your body</p>
                            </td>
                        </tr>
                        <!-- Body -->
                        <tr>
                            <td style="padding: 35px 30px; text-align: left;">
                                <h2 style="margin: 0 0 15px; font-size: 20px; color: #A3FFD6;">Halo, ${username}! 👋</h2>
                                <p style="margin: 0 0 25px; font-size: 15px; line-height: 1.6; color: #9EC8B9;">
                                    ${description}
                                </p>
                                <!-- OTP Box -->
                                <div style="text-align: center; margin: 30px 0;">
                                    <div style="display: inline-block; background-color: rgba(9, 38, 53, 0.8); border: 2px dashed #A3FFD6; border-radius: 12px; padding: 15px 35px;">
                                        <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #A3FFD6; font-family: monospace;">${otp}</span>
                                    </div>
                                </div>
                                <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.5; color: #9EC8B9;">
                                    <strong style="color: #A3FFD6;">Penting:</strong> Kode OTP ini hanya berlaku selama <strong>5 menit</strong>. Jangan bagikan kode ini kepada siapapun demi keamanan akun Anda.
                                </p>
                                <hr style="border: none; border-top: 1px solid rgba(158, 200, 185, 0.2); margin: 25px 0;">
                                <p style="margin: 0; font-size: 13px; color: rgba(158, 200, 185, 0.6); text-align: center;">
                                    Jika Anda merasa tidak melakukan permintaan ini, abaikan email ini.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    // Coba kirim via SMTP
    if (process.env.SMTP_USER) {
        try {
            // const transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //         user: process.env.SMTP_USER,
            //         pass: process.env.SMTP_PASS
            //     },
            // });
            // const info = await transporter.sendMail({
            //     from: `"SatSetFit" <${process.env.SMTP_USER}>`,
            //     to: to,
            //     subject: subject,
            //     html: htmlContent,
            //     text: `${title}\n\nHalo ${username}, kode OTP Anda adalah ${otp} (berlaku 5 menit).`
            // });

            const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });
            const result = await brevo.transactionalEmails.sendTransacEmail({
                subject: subject,
                htmlContent: htmlContent,
                sender: { name: 'SatSetFit', email: process.env.SMTP_USER },
                to: [{ email: to, name: username }],
            });

            console.log(`[EMAIL SENT] Message ID: ${result.messageId}`);
            return true;
        } catch (err) {
            // console.error('[EMAIL ERROR] Gagal mengirim email via SMTP:', error.message);
            if (err instanceof UnauthorizedError) {
                console.error('Invalid API key');
            } else if (err instanceof TooManyRequestsError) {
                const retryAfter = err.rawResponse.headers['retry-after'];
                console.error(`Rate limited. Retry after ${retryAfter}s`);
            } else if (err instanceof BrevoError) {
                console.error(`API error ${err.statusCode}:`, err.message);
            }
            // Tetap return true di development jika gagal SMTP, agar user tetap bisa tes dari OTP log
            return true;
        }
    } else {
        console.log('[EMAIL SKIP] SMTP tidak dikonfigurasi di .env. Menggunakan log OTP di atas untuk verifikasi.');
        return true;
    }
};
