'use strict';

module.exports = function () {
    const client = './client/';
    const server = './server/';
    const source = './src/';
    const bower = './bower_components';

    const globs = {
        allDirs: '**/*',
        allFiles: '**/*.*',
        allClientFiles: './client/**/*.*',
        css: '*.css',
        fonts: '*.{ttf,otf}',
        img: '*.{png,jpg,jepg,svg,ico}',
        html: '*.{htm,html}'
    };

    const config = {
        bower: bower,
        client: {
            all: [`${client}${globs.allFiles}`, `${client}${globs.allDirs}`],
            app: `${client}app/**/*.js`,
            dir: client,
            common: `${client}app/common`,
            inject: [`src.min.js`, `app/dependencies/**.*.js`, `**/*.module.js`, `**/*.constants.js`, `**/*.js`, `**/*.css`]
        },
        globs: globs,
        src: {
            app: [`${source}app/dependencies/**.*.js`, `${source}**/*.module.js`, `${source} **/*.constants.js`, `${source}**/*.*.js`, `${source}**/*.js`],
            markdown: `${source}**/*.md`,
            json: `${source}**/*.json`,
            dir: source,
            images: `${source}**/${globs.img}`,
            fonts: `${source}**/${globs.fonts}`,
            index: `${source}index.htm`,
            html: `${source}**/${globs.html}`,
            style: {
                allScss: `${source}**/*.scss`,
                index: `${source}index.scss`,
                dir: `${source}style/`,
                main: `${source}style/${globs.allFiles}`,
            }
        }
    };
    return config;
}
