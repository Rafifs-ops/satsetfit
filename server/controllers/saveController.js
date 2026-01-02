const User = require('../models/User');

exports.saveCalcResult = async (req, res) => {
    const {id, date, bmi, bmr, tdde} = req.body;
    const hasilHitung = {
        date: date,
        hasilBmi: bmi,
        hasilBmr: bmr,
        hasilTdde: tdde
    };

    await User.updateOne({_id: ObjectId(id)}, {$push: {historyResults: hasilHitung}})
}