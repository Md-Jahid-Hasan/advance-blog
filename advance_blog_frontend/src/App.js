import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Navbar from "./Component/Navbar";
import BlogPost from "./Component/Post";
import PostCreate from "./Component/Post/Create/post"
function App() {
  return (
    <div className="container">
        <Router>
            <Navbar/>
            <Routes>
                <Route exact path={'/post/:post_id'} element={<BlogPost/>}/>
                <Route exact path={'/create/post'} element={<PostCreate/>}/>
            </Routes>
        </Router>

    </div>
  );
}

export default App;
