import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { REPO_API_URL } from '../utils/constants';


const RepoDetails = () => {
  const { repoName } = useParams();
  
  const { data: repo, loading, error } = useFetch(
    `${REPO_API_URL}/${repoName}`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!repo) return null;

  return (
    <div className="repo-details">
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <p><strong>Language:</strong> {repo.language || 'Not specified'}</p>
      <p><strong>Forks:</strong> {repo.forks_count}</p>
      <p><strong>Open Issues:</strong> {repo.open_issues_count}</p>
      <p><strong>Watchers:</strong> {repo.watchers_count}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
      <br />
      <Link to="/">Back to Repositories</Link>
    </div>
  );
};

export default RepoDetails;