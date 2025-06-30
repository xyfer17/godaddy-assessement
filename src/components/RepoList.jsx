import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { ORG_REPOS_API_URL } from "../utils/constants";

const RepoList = () => {
  const { data: repos, loading, error } = useFetch(ORG_REPOS_API_URL);

  if (loading) return <div aria-busy="true">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="repo-list">
      {repos &&
        repos.map((repo) => (
          <Link to={`/repo/${repo.name}`}>
            <div
              key={repo.id}
              className="repo-item"
            >
              {repo.name}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default RepoList;
