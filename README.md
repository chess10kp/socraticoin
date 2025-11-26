# SocratiCoin

An educational cryptocurrency built with Next.js and TypeScript. This project demonstrates the core concepts of blockchain technology through a fully functional client-side implementation.

## Features

- **Wallet Management**: Create and manage cryptographic wallets with public/private key pairs
- **Transaction Creation**: Create and sign transactions with gas fees
- **Mining**: Mine blocks with proof-of-work algorithm
- **Blockchain Visualization**: View the complete blockchain with all blocks and transactions
- **Transaction Queue**: See pending transactions waiting to be mined
- **Real-time Updates**: Live state management with Zustand
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/socraticoin.git
cd socraticoin
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## How It Works

This implementation runs entirely in the browser using:

- **Web Crypto API** for cryptographic operations (key generation, signing, verification)
- **TypeScript classes** to replicate blockchain logic
- **Zustand** for state management
- **SHA-256** hashing for proof-of-work mining

The application initializes with sample data including:
- 3 users with wallets
- Genesis block
- Sample transactions and blocks

## Architecture

- `/src/lib/` - Core blockchain classes (Block, Transaction, Wallet, Blockchain)
- `/src/components/` - React components for UI
- `/src/store/` - Zustand state management
- `/src/app/` - Next.js app router pages
- `/src/components/ui/` - Reusable UI components (shadcn/ui)

## Core Classes

### Block
Represents a single block in the blockchain:
- Block number, nonce, hash
- Previous block hash reference
- Transactions array
- Block reward and reward address

### Transaction
Represents a cryptocurrency transaction:
- Sender and receiver addresses
- Amount and gas fee
- Digital signature
- Timestamp

### Wallet
Manages cryptographic keys:
- Public/private key pair generation
- Address derivation
- Transaction signing
- Balance tracking

### Blockchain
Main blockchain logic:
- Block validation and verification
- Proof-of-work mining
- Transaction queue management
- Chain integrity checks

## API Reference

### Blockchain Store Methods

```typescript
// Get all blocks in the chain
const blocks = getBlocks();

// Get pending transactions
const transactions = getTransactions();

// Get current user wallet
const user = getCurrentUser();

// Create new transaction
await createTransaction(sender, receiver, amount, gasFee);

// Mine pending transactions
await mineTransactions();

// Add new user
await addUser();
```

### Component Props

#### BlockchainVisualization
- No props required
- Displays all blocks in the blockchain
- Shows transaction details within each block

#### TransactionList
- No props required
- Shows pending transaction queue
- Allows transaction selection for mining

#### TransactionForm
- No props required
- Form to create new transactions
- Validates sender balance

#### MiningPanel
- No props required
- Mining controls and status
- Difficulty adjustment

#### WalletInfo
- No props required
- Displays current wallet information
- Shows address and balance

## Testing

The project includes a comprehensive test suite using Jest and React Testing Library:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```

Tests cover:
- Component rendering
- User interactions
- Blockchain logic
- State management

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code quality
- Write tests for new features
- Update documentation for API changes

## Learn More

This project is designed for educational purposes to help understand:
- How blockchain data structures work
- Public/private key cryptography
- Transaction signing and verification
- Proof-of-work mining
- Block validation and chain integrity
- State management in React applications

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **shadcn/ui** - UI component library
- **Web Crypto API** - Cryptographic operations
- **Jest** - Testing framework
- **ESLint** - Code linting

## License

This project is licensed under the MIT License - see the LICENSE file for details.
