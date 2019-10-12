import express from 'express';
import path from 'path';
import fs from 'fs';
import app, { configApp } from './app';

configApp().then(() => {
    // Serve the react build if available
    if (fs.existsSync(path.join(__dirname, '../react-app/build/index.html'))) {
        app.use(express.static(path.join(__dirname, '../react-app/build')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../react-app/build/index.html'))
        });
    }
    
    // Start server
    app.listen(3001, function () {
        console.log('App listening on port 3001!');
    });
});
