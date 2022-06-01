import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import GithubCorner from 'react-github-corner';

import Editor from './containers/Editor';
import { Button } from 'antd';
import Icon from 'polestar-icons';
import Title from 'antd/es/skeleton/Title';

class App extends Component {

    handleClick(e) {
        const contentUrl="https://content-manager-route-nikitadyadechkin-1-dev.apps.sandbox.x8i5.p1.openshiftapps.com";
        const arHubUrl = "https://ar-hub-mobile-route-nikitadyadechkin-1-dev.apps.sandbox.x8i5.p1.openshiftapps.com";
        const currentPost: any = JSON.parse(window.localStorage.getItem('post'));
        const matrix: any = JSON.parse(window.localStorage.getItem('matrix'));

        const patchPost = {
            'markerImageId': currentPost.markerImageId,
            'markerVanillaMarkerId': currentPost.markerVanillaMarkerId,
            'modelId': currentPost.modelId,
            'previewImageId': currentPost.modelId,
            'rotation': [
                matrix.rotation.x, matrix.rotation.y, matrix.rotation.z
            ],
            'scale': [
                matrix.scale.x, matrix.scale.y, matrix.scale.z
            ],
            'title': currentPost.title,
            'translation': [
                matrix.position.x, matrix.position.y, matrix.position.z
            ],
        };

        console.log(patchPost)

        fetch(`${contentUrl}/posts/${currentPost.id}`,
            {
                method: 'PATCH', headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(patchPost),
            })
            .then(response => {
                console.log(response);
                window.location = arHubUrl;
            });
    }

    render() {
        return (
            <div className='container'>
                <Helmet>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='width=device-width, initial-scale=0.1' />
                    <link rel='manifest' href='./manifest.json' />
                    <link rel='shortcut icon' href='./favicon.ico' />
                    <link rel='stylesheet' href='https://fonts.googleapis.com/earlyaccess/notosanskr.css' />
                    <title>React 3D Editor</title>
                    <script async={true} src='https://www.googletagmanager.com/gtag/js?id=UA-97485289-1' />
                    <script>
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-97485289-1');
                        `}
                    </script>
                </Helmet>

                <Editor />

                <Button onClick={this.handleClick} style={{ zIndex: '1000' }} type='primary'>
                    Сохранить
                </Button>
            </div>
        );
    }
}

export default App;
