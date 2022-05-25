import React from 'react';

function Compiler() {

    async function compile(images) {

        console.log(images);
        const compiler = new window.MINDAR.IMAGE.Compiler();

        const dataList = await compiler.compileImageTargets([images], (progress) => {  // images is an array of HTML image object
            console.log("progress", progress);
        });

        console.log(dataList);

        return await compiler.exportData();
    }

    const loadImage = async (file) => {
        const img = new Image();

        return new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
            //img.src = src
        })
    }

        window.addEventListener("message", messageHandler, false);
        function messageHandler(event) {
            const { action, key, value } = event.data;
            console.log(action, value);
            if (action == 'save'){
                (async () => {
                    compile(await loadImage(value[0])).then((item) => {
                        console.log(item)
                        event.source.postMessage({
                            action: 'returnData',
                            key,
                            item,
                        }, '*')
                    })
                })();
            }
        }

    return (
        <div>
            <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/dist/mindar-image.prod.js"
                    type="text/javascript" />
        </div>
    );
}

export default Compiler;
