# PayStar - Decentralized Commerce Platform

PayStar is a Web3-native marketplace built on Stellar blockchain, featuring wallet-based authentication and Soroban smart contracts for secure, trustless transactions.

## 🌟 Key Features

### Wallet-Based Authentication
- **No traditional signup/login** - Connect with your Stellar wallet
- **Freighter wallet integration** - Secure, browser-based wallet
- **Persistent sessions** - Stay connected across browser sessions
- **True decentralization** - No central authority controls your account

### Smart Contract Integration
- **Soroban smart contracts** - Stellar's native smart contract platform
- **Escrow functionality** - Secure transactions with automated escrow
- **Installment payments** - Flexible payment options
- **Dispute resolution** - Automated and fair conflict resolution

### Modern Web3 UX
- **Seamless wallet connection** - One-click authentication
- **Real-time blockchain data** - Live transaction feeds
- **Mobile responsive** - Works on all devices
- **Dark mode optimized** - Beautiful, modern interface

## 🚀 Getting Started

### Prerequisites
1. **Freighter Wallet** - Install from [freighter.app](https://freighter.app)
2. **Testnet XLM** - Get free testnet tokens for development
3. **Node.js 18+** - For running the development server

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd paystar

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Configure your environment variables:
```env
# Stellar Network Configuration
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_STELLAR_SOROBAN_URL=https://soroban-testnet.stellar.org

# Smart Contract Configuration (add after deployment)
NEXT_PUBLIC_PAYSTAR_CONTRACT_ID=your_contract_id_here
```

## 🔗 Wallet Integration

### How It Works

1. **Visit the app** - Go to [localhost:3000](http://localhost:3000)
2. **Connect Wallet** - Click "Connect Wallet" to access `/wallet`
3. **Authenticate** - Connect your Freighter wallet
4. **Access Marketplace** - Browse and interact with smart contracts

### Supported Wallets

- **Freighter** (Recommended) - Browser extension wallet
- **Future support** - Additional Stellar wallets coming soon

### Network Support

- **Testnet** - Full development environment
- **Mainnet** - Production ready (configure in environment)

## 🛠 Smart Contract Development

### Contract Structure

```
contracts/
├── README.md              # Contract development guide
└── paystar-contract/      # Soroban smart contract source
```

### Key Contract Functions

- `create_agreement()` - Initialize payment agreements
- `make_payment()` - Process installment payments
- `release_funds()` - Complete successful transactions
- `handle_dispute()` - Resolve payment conflicts

### Deployment

```bash
# Install Stellar CLI
npm install -g @stellar/cli

# Build and deploy contract
stellar contract build
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/paystar_contract.wasm --source YOUR_SECRET_KEY --network testnet
```

## 📁 Project Structure

```
paystar/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── wallet/                  # Wallet authentication
│   ├── marketplace/             # Product marketplace
│   ├── dashboard/               # User dashboard
│   └── layout.tsx               # App layout with providers
├── components/
│   ├── wallet-connect.tsx       # Wallet connection UI
│   ├── wallet-provider.tsx      # Wallet state management
│   ├── contract-interaction.tsx # Smart contract UI
│   └── ui/                      # Reusable UI components
├── lib/
│   └── soroban/
│       ├── client.ts            # Core Soroban utilities
│       └── contracts/
│           └── paystar.ts       # PayStar contract wrapper
├── hooks/
│   └── use-paystar-contract.ts  # Contract interaction hook
└── contracts/                   # Smart contract source code
```

## 🔧 Key Technologies

- **Next.js 15** - React framework with App Router
- **Stellar SDK** - Blockchain interaction
- **Freighter API** - Wallet integration  
- **Soroban RPC** - Smart contract communication
- **Tailwind CSS** - Styling and UI
- **TypeScript** - Type safety

## 🌐 User Flow

### Authentication Flow
1. User visits app
2. Clicks "Connect Wallet"
3. Freighter extension opens
4. User approves connection
5. App receives wallet public key
6. User is authenticated and redirected

### Transaction Flow
1. User browses marketplace
2. Selects product and payment terms
3. Smart contract interaction UI appears
4. User initiates contract transaction
5. Freighter signs transaction
6. Transaction submitted to Stellar network
7. Real-time status updates

## 🔒 Security Features

- **Non-custodial** - Users control their private keys
- **Smart contract escrow** - Automated fund management
- **Network verification** - Ensures correct Stellar network
- **Transaction simulation** - Preview before signing
- **Error handling** - Comprehensive error management

## 📚 Resources

- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Smart Contracts](https://developers.stellar.org/docs/build/smart-contracts)
- [Freighter Wallet](https://freighter.app/)
- [PayStar Integration Guide](./SOROBAN_INTEGRATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with testnet
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the Stellar ecosystem**
