import React from 'react';
import MindARViewer from "./mindar-viewer";
import Test from "./test";
import Test2 from "./test2";

function ArViewer() {

    return (
        <div className="App">
            <div className="container">
                <Test/>
                <video></video>
            </div>
        </div>
    );
}

export default ArViewer;
