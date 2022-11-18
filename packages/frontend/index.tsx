import React from 'react';
import {createRoot} from 'react-dom/client';
import App from '#/frontend/components/App';

const body = document.querySelector('body');
const container = document.createElement('container');
body.append(container);

const root = createRoot(container);

root.render(<App/>);
