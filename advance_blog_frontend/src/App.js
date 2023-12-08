import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Navbar from "./Component/Navbar";
import Post from "./Component/Post";
import PostCreate from "./Component/Post/Create/post"
function App() {
  return (
    <div className="container">
      <Navbar/>
        <Router>
            <Routes>
                <Route exact path={'/post/:post_id'} element={<Post/>}/>
                <Route exact path={'/create/post'} element={<PostCreate/>}/>
            </Routes>
        </Router>

    </div>
  );
}

export default App;
