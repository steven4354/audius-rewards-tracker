# Audius Rewards Tracker

Quick cron service to check that all the audius rewards claims are being done for our audius nodesw and if not, alert (email).

### resources

Audius dashboard: 
https://dashboard.audius.org/#/services/operator/0x61A1BC089f87F1C0e38A34207D65077484d89088

To test the contract calls manually go to https://etherscan.io/address/0xe6d97b2099f142513be7a2a068be040656ae4591#readProxyContract and call the lastClaimedFor function with 0x61A1BC089f87F1C0e38A34207D65077484d89088

Contract abi is from https://etherscan.io/address/0xf26919f9b1cff09c77e9300e971f6d2fef761c33#code

