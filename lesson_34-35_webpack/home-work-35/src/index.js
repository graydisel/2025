import Post from './post';
import './assets/scss/style.scss';
import {userName} from "./script.ts";

import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('root'));
root.render(<App />);

const post = new Post('Webpack Post Title');

console.log('Post to string:', post.toString());
console.log('User Name:', userName)
