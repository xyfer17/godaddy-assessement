import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RepoDetails from './RepoDetails';
import useFetch from '../hooks/useFetch';

vi.mock('../hooks/useFetch');

afterEach(() => {
  vi.clearAllMocks();
});

const mockRepo = {
  name: 'Test Repo',
  description: 'A repository for testing purposes.',
  language: 'TypeScript',
  forks_count: 42,
  open_issues_count: 7,
  watchers_count: 123,
  html_url: 'https://github.com/godaddy/test-repo',
};

const renderWithRouter = (route) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/repo/:repoName" element={<RepoDetails />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('RepoDetails Component', () => {
  it('should display the loading state correctly', () => {
    useFetch.mockReturnValue({ data: null, loading: true, error: null });
    renderWithRouter('/repo/test-repo');
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display an error message if the fetch fails', () => {
    useFetch.mockReturnValue({ data: null, loading: false, error: new Error('Network Error') });
    renderWithRouter('/repo/test-repo');
    expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
  });

  it('should display repository details successfully', () => {
    useFetch.mockReturnValue({ data: mockRepo, loading: false, error: null });
    renderWithRouter('/repo/test-repo');
    expect(screen.getByRole('heading', { level: 2, name: 'Test Repo' })).toBeInTheDocument();
    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
    expect(screen.getByText('Language:').parentElement).toHaveTextContent('Language: TypeScript');
    expect(screen.getByText('Forks:').parentElement).toHaveTextContent('Forks: 42');
    expect(screen.getByText('Open Issues:').parentElement).toHaveTextContent('Open Issues: 7');
    expect(screen.getByText('Watchers:').parentElement).toHaveTextContent('Watchers: 123');
    const githubLink = screen.getByRole('link', { name: /view on github/i });
    expect(githubLink).toHaveAttribute('href', mockRepo.html_url);
  });

  it('should display a fallback message for a null language', () => {
    useFetch.mockReturnValue({
      data: { ...mockRepo, language: null },
      loading: false,
      error: null,
    });
    renderWithRouter('/repo/another-repo');
    const languageLabel = screen.getByText('Language:');
    expect(languageLabel.parentElement).toHaveTextContent('Language: Not specified');
  });
});