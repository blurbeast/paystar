# PayStar Smart Contract

This directory contains Soroban smart contract code for the PayStar marketplace.

## Contract Structure

The PayStar contract handles:
- Payment agreements between buyers and sellers
- Escrow functionality for secure transactions
- Installment payment processing
- Dispute resolution

## Getting Started

1. Install Stellar CLI and Soroban tools:
```bash
# Install Stellar CLI
curl -L https://github.com/stellar/stellar-cli/releases/latest/download/stellar-cli-windows.exe -o stellar.exe

# Or using npm
npm install -g @stellar/cli
```

2. Initialize a new Soroban project:
```bash
stellar contract init paystar-contract
cd paystar-contract
```

3. Example contract structure (in Rust):

```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String, Vec};

#[contract]
pub struct PayStarContract;

#[contractimpl]
impl PayStarContract {
    pub fn create_agreement(
        env: Env,
        buyer: Address,
        seller: Address,
        amount: i128,
        installments: u32,
        description: String,
    ) -> String {
        // Implementation for creating payment agreements
        // Store agreement data and return agreement ID
        todo!()
    }

    pub fn make_payment(
        env: Env,
        agreement_id: String,
        amount: i128,
    ) -> bool {
        // Implementation for making installment payments
        todo!()
    }

    pub fn release_funds(
        env: Env,
        agreement_id: String,
    ) -> bool {
        // Implementation for releasing escrowed funds
        todo!()
    }

    pub fn get_agreement(
        env: Env,
        agreement_id: String,
    ) -> Option<(Address, Address, i128, u32, u32)> {
        // Implementation for retrieving agreement details
        // Returns (buyer, seller, amount, installments, current_installment)
        todo!()
    }
}
```

## Deployment

1. Build the contract:
```bash
stellar contract build
```

2. Deploy to testnet:
```bash
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/paystar_contract.wasm \
  --source your-keypair \
  --network testnet
```

3. Add the contract ID to your frontend environment variables.

## Frontend Integration

The frontend uses the contract through:
- `lib/soroban/client.ts` - Core Soroban interaction utilities
- `lib/soroban/contracts/paystar.ts` - PayStar contract wrapper
- `hooks/use-paystar-contract.ts` - React hook for contract operations
