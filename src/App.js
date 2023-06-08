import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Routes 추가
import MainPage from './components/MainPage';
import SubwayLists from './components/SubwayLists';
import Suinbundang from './components/Suinbundang';
import SubwayGraph from './components/SubwayGraph';
import SuinLine from './components/SuinLine';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/subwaylists">SUBWAYS</Link>
            </li>
          </ul>
        </nav>

        <Routes> {/* Routes로 감싸기 */}
          <Route path="/" element={<MainPage />} /> {/* element 속성 추가 */}
          <Route path="/subwaylists" element={<SubwayLists />} /> {/* element 속성 추가 */}
          <Route path="/suinbundang" element={<Suinbundang />} />
          <Route path="/subwaygraph" element={<SubwayGraph />} />
          <Route path="/suinline" element={<SuinLine />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
