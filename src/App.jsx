import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const RepoList = lazy(() => import('./components/RepoList'));
const RepoDetails = lazy(() => import('./components/RepoDetails'));

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>GoDaddy GitHub Repositories</h1>
        </header>
        <main>
          <Suspense fallback={<div className='loading'></div>}>
            <Routes>
              <Route path="/" element={<RepoList />} />
              <Route path="/repo/:repoName" element={<RepoDetails />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;