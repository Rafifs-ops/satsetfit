// --- Inisialisasi Midtrans Snap ---
const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

exports.payment = async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ error: "Username and email are required" });
        }

        const price = 50000;
        const orderId = `SATSETFIT-PREMIUM-${Date.now()}`;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: price,
            },
            item_details: [{
                id: "PREMIUM-FITCAL-1BULAN",
                price: price,
                quantity: 1,
                name: "FitCal Premium 1 Bulan",
            }],
            customer_details: {
                name: username,
                email: email
            },
        };

        const transaction = await snap.createTransaction(parameter);

        res.status(200).json({ token: transaction.token, order_id: orderId });

    } catch (error) {
        console.error("Error creating Midtrans transaction:", error.message);
        res.status(500).json({ error: error.message });
    }
}