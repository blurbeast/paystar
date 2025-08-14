# PayStar Soroban Integration Guide

This guide will help you integrate your PayStar marketplace with Stellar Soroban smart contracts.

## What We've Done

✅ **Removed all Supabase dependencies and keys**
✅ **Integrated Stellar Soroban SDK**
✅ **Created smart contract interaction utilities**
✅ **Added Freighter wallet connection**
✅ **Built React hooks for contract operations**
✅ **Created UI components for contract interaction**

## Next Steps

### 1. Install Stellar CLI

```bash
# Windows (PowerShell as Administrator)
npm install -g @stellar/cli

# Verify installation
stellar version
```

### 2. Set up Development Environment

1. Create a `.env.local` file from the example:
```bash
cp .env.example .env.local
```

2. Fund a testnet account:
   - Go to https://laboratory.stellar.org/#account-creator
   - Create and fund a testnet account
   - Save the secret key securely

### 3. Create and Deploy Smart Contract

1. Initialize contract project:
```bash
# In a separate directory
stellar contract init paystar-contract
cd paystar-contract
```

2. Implement the contract (see `contracts/README.md` for example)

3. Build and deploy:
```bash
stellar contract build
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/paystar_contract.wasm \
  --source YOUR_SECRET_KEY \
  --network testnet
```

4. Add the contract ID to `.env.local`:
```
NEXT_PUBLIC_PAYSTAR_CONTRACT_ID=your_deployed_contract_id
```

### 4. Install Freighter Wallet

1. Install the Freighter browser extension from https://freighter.app/
2. Create or import a testnet account
3. Fund it with testnet XLM

### 5. Test the Integration

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `/marketplace`
3. Connect your Freighter wallet
4. Use the "Smart Contract Interface" to test contract interactions

## Key Files

- `lib/soroban/client.ts` - Core Soroban interaction utilities
- `lib/soroban/contracts/paystar.ts` - PayStar contract wrapper
- `components/wallet-connect.tsx` - Wallet connection UI
- `components/contract-interaction.tsx` - Contract interaction UI
- `hooks/use-paystar-contract.ts` - React hook for contract operations

## Features Implemented

### Wallet Integration
- Freighter wallet detection and connection
- Account balance display
- Network verification (testnet)

### Smart Contract Operations
- Create payment agreements
- Make installment payments
- Release funds to sellers
- Get agreement details
- Handle disputes (admin function)

### User Interface
- Wallet connection status
- Contract interaction panel
- Transaction status feedback
- Error handling and user notifications

## Development Workflow

1. **Frontend Development**: Use the existing UI and mock data
2. **Contract Development**: Build and test contracts separately
3. **Integration**: Connect deployed contracts to the frontend
4. **Testing**: Use testnet for all operations

## Security Considerations

- All keys are removed from the codebase
- Uses environment variables for configuration
- Freighter wallet handles all transaction signing
- No private keys stored in the application

## Resources

- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Documentation](https://developers.stellar.org/docs/build/smart-contracts)
- [Freighter Wallet](https://freighter.app/)
- [Stellar Laboratory](https://laboratory.stellar.org/)

## Support

If you need help with:
- Smart contract development
- Stellar CLI usage
- Frontend integration
- Wallet connection issues

Refer to the Stellar Developer Discord or documentation.
