# Audius Rewards Tracker

On-chain monitor for Audius node operator staking rewards with email notifications.

## What it does

- Queries the [Audius staking contract](https://etherscan.io/address/0xe6d97b2099f142513be7a2a068be040656ae4591#readProxyContract) on Ethereum to check when rewards were last claimed for a given operator
- Runs on a cron schedule (daily at 5 PM PST in production, every minute in dev)
- Sends email alerts via Zoho SMTP with the last claimed block and timestamp

## Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in the values:

```
ALCHEMY_URL=         # Ethereum RPC endpoint from Alchemy
EMAIL=               # Zoho email address (used as SMTP sender)
PASSWORD=            # Zoho email password
RECIPIENT_EMAIL=     # Email address to receive alerts
PROD=true            # Set to "true" for daily schedule, otherwise runs every minute
```

3. Run:

```bash
npm start
```

## How it works

The service uses Web3.js to call `lastClaimedFor` on the Audius staking proxy contract, passing in the operator address. It reads the block number returned, fetches the block timestamp, and emails the result.

## References

- [Audius Operator Dashboard](https://dashboard.audius.org/#/services/operator/0x61A1BC089f87F1C0e38A34207D65077484d89088)
- [Staking Proxy Contract](https://etherscan.io/address/0xe6d97b2099f142513be7a2a068be040656ae4591#readProxyContract) — call `lastClaimedFor` with the operator address
- [Contract ABI source](https://etherscan.io/address/0xf26919f9b1cff09c77e9300e971f6d2fef761c33#code)

