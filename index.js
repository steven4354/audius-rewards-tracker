const Web3 = require("web3");
const cron = require("node-cron");
const fs = require("fs");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

// Connect to the Ethereum network using Alchemy
const web3 = new Web3(process.env.ALCHEMY_URL);
console.log('Connected to Ethereum network');

// Import the contract ABI from a JSON file
const contractABI = JSON.parse(fs.readFileSync("./contract-abi.json", "utf8"));
console.log('Contract ABI imported');

// The contract address of audius staking contract
const contractAddress = "0xe6d97b2099f142513be7a2a068be040656ae4591";

// Create a new contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);
console.log('Contract instance created');

// The account address you want to check
const accountAddress = "0x61A1BC089f87F1C0e38A34207D65077484d89088";

// Create a transporter object using Zoho SMTP
let transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
console.log('Transporter object created');

// Schedule a task to run every day at 5pm PT
// 0 17 * * *

// Schedule a task to run every minute
// * * * * *

cron.schedule(
  "0 17 * * *",
  async () => {
    try {
      console.log('Task started');
      const lastClaimedFor = await contract.methods
        .lastClaimedFor(accountAddress)
        .call();
      console.log(`Last claimed for: ${lastClaimedFor}`);

      // Send an email with the last claimed for information
      let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.RECIPIENT_EMAIL,
        subject: "Last Claimed For Information",
        text: `Last claimed for: ${lastClaimedFor}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      console.log('Task completed');
    } catch (error) {
      console.error('Error in task:', error);
    }
  },
  {
    timezone: "America/Los_Angeles",
  }
);
console.log('Task scheduled');