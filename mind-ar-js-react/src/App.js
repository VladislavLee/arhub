import React from 'react';
import 'mind-ar/dist/mindar-image.prod.js';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ArViewer from "./ar-viewer";
import Compiler from "./compiler";
import Empty from "./empty";

function App() {
 return(
     <Router>
         <Routes>
             <Route path="/" element={<Empty/>}></Route>
             <Route path="/ar-viewer/:markerImageId/:modelId/:rotation0/:rotation1/:rotation2/:translation0/:translation1/:translation2/:scale0/:scale1/:scale2" element={<ArViewer/>}></Route>
             <Route path="/compiler" element={<Compiler/>}></Route>
         </Routes>
     </Router>
 )
}

export default App;
