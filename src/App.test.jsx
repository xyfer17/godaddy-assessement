// src/App.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import RepoList from './components/RepoList';

// Mock axios using Vitest's mocking capabilities
vi.mock('axios');

describe('RepoList component', () => {
  it('renders a list of repositories after loading', async () => {
    const mockRepos = [
      { id: 1, name: 'repo-1' },
      { id: 2, name: 'repo-2' },
    ];
    axios.get.mockResolvedValue({ data: mockRepos });

    render(
      <MemoryRouter>
        <RepoList />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('repo-1')).toBeInTheDocument();
      expect(screen.getByText('repo-2')).toBeInTheDocument();
    });

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});