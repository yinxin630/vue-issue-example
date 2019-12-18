const path = require('path');
const fs = require('fs');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');

const app = express();

function resolve(...args) {
    return path.resolve(process.cwd(), ...args);
}

const template = fs.readFileSync(resolve('./dist/template.html'), 'utf-8');

app.use('/', (req, res, next) => {
    const renderer = createBundleRenderer(resolve('./dist/vue-ssr-server-bundle.json'), {
        runInNewContext: false,
        template,
    });

    if (/\.[^.]+$/.test(req.url)) {
        return next();
    }

    const context = { url: req.url };

    renderer.renderToString(context, (err, html) => {
        if (err) {
            console.error(err);
            next();
        } else {
            res.end(html);
        }
    });

    return null;
});

app.use(express.static(resolve('./dist')));

const port = process.env.PORT || 8099;

app.listen(port, () => {
    console.log(`Server run at http://localhost:${port}`);
});
