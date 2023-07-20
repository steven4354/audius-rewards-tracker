const Web3 = require("web3");
const cron = require("node-cron");
const fs = require("fs");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

// Connect to the Ethereum network using Alchemy
const web3 = new Web3(process.env.ALCHEMY_URL);

// Import the contract ABI from a JSON file
const contractABI = JSON.parse(fs.readFileSync("./contract-abi.json", "utf8"));

// The contract address of audius staking contract
const contractAddress = "0xe6d97b2099f142513be7a2a068be040656ae4591";

// Create a new contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

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

// Schedule a task to run every day at 5pm PT
cron.schedule(
  "0 17 * * *",
  async () => {
    const lastClaimedFor = await contract.methods
      .lastClaimedFor(accountAddress)
      .call();
    console.log(`Last claimed for: ${lastClaimedFor}`);

    // Send an email with the last claimed for information
    let mailOptions = {
      from: process.env.EMAIL,
      to: "recipient@example.com",
      subject: "Last Claimed For Information",
      text: `Last claimed for: ${lastClaimedFor}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
  {
    timezone: "America/Los_Angeles",
  }
);
