import { render, screen } from '@testing-library/react';
import { BlockchainVisualization } from '../blockchain-visualization';

// Mock the blockchain store
jest.mock('@/store/blockchain', () => ({
  useBlockchainStore: () => ({
    getBlocks: () => [
      {
        blockNumber: 0,
        nonce: 12345,
        currHash: '0000000000000000abcdef1234567890',
        prevHash: 'Genesis_Block',
        blockReward: 100,
        rewardAddress: '0x1234567890abcdef',
        transactions: []
      }
    ]
  })
}));

describe('BlockchainVisualization', () => {
  it('renders blockchain title', () => {
    render(<BlockchainVisualization />);
    expect(screen.getByText('Blockchain')).toBeInTheDocument();
  });

  it('displays block information', () => {
    render(<BlockchainVisualization />);
    expect(screen.getByText('Block #0')).toBeInTheDocument();
    expect(screen.getByText('Nonce: 12345')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('shows next block placeholder', () => {
    render(<BlockchainVisualization />);
    expect(screen.getByText('Next Block #1')).toBeInTheDocument();
    expect(screen.getByText('Waiting to be mined...')).toBeInTheDocument();
  });
});