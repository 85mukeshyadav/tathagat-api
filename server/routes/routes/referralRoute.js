const { addReferral, getReferral } = require("../../helper/helper");

module.exports = (app, db) => {

  app.get("/getreferral", async (req, res) => {
      req.db = db;
      console.log(req.body);
      const referral = await getReferral(req);
      if (referral) {
        return res.status(200).json({ referral });
      } else {
        return res.status(500).json({ error: 'No referral found' });
      }
    });
  
  app.post("/addreferral", async (req, res) => {
    req.db = db;

    if (!req.body.userEmailId) {
      return res.status(400).json({ error: 'User email id is required' });
    }

    const referral = await getReferral(req);
    if (referral) {
      return res.status(400).json({ error: 'Referral already added' });
    }

    const isReferralAdded = await addReferral(req);
    if (isReferralAdded) {
      return res.status(200).json({ message: 'Referral added successfully' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}