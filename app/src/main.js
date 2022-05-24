import React from "react";
import { createRoot } from 'react-dom/client';
// import ReactDOM  from "react-dom";
import Editor from './components/editor';

// ReactDOM.render(<Editor/> , document.getElementById('root'));
createRoot(document.getElementById('root')).render(<Editor />);