

import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Complaint from "./pages/Complaint";
import Treatment from "./pages/Treatment";
import PostOp from "./pages/PostOp";
import PostOpViewer from "./pages/PostOpViewer";
import ELibrary from "./pages/ELibrary";
import ELibraryViewer from "./pages/ELibraryViewer";
import Layout from "./components/Layout";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/elibrary" element={<ELibrary />} />
          <Route path="/elibrary-viewer" element={<ELibraryViewer />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/treatment" element={<Treatment />} />
          <Route path="/postop" element={<PostOp />} />
          <Route path="/postop-viewer" element={<PostOpViewer />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
