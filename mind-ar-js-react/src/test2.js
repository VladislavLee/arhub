import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";

export default () => {
    const sceneRef = useRef(null);
    const {markerImageId, modelId, rotation0, rotation1, rotation2, translation0, translation1, translation2, scale0, scale1, scale2} = useParams()
    const [response, setResponse] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const contentUrl = 'https://late-weeks-guess-5-3-247-25.loca.lt/content/'

    useEffect(() => {
        const sceneEl = sceneRef.current;
        const arSystem = sceneEl.systems["mindar-image-system"];

        // fetch(`https://fancy-taxis-kneel-5-3-247-25.loca.lt/posts/full/${id}`)
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             console.log(result);
        //             setResponse(result);
        //             setIsLoaded(true);
        //             sceneEl.addEventListener('renderstart', () => {
        //                 arSystem.start(); // start AR
        //             });
        //         },
        //     )

        return () => {
            arSystem.stop();
        }

    }, []);

    return (
        <a-scene ref={sceneRef}
                 mindar-image={`imageTargetSrc: ${contentUrl}/${markerImageId}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
                 color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights"
                 vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
            <a-assets>
                <a-asset-item id="avatarModel" src={`${contentUrl}/${modelId}`}/>
            </a-assets>

            <a-camera position="0 0 0" look-controls="enabled: false"/>

            <a-entity mindar-image-target="targetIndex: 0">
                <a-plane src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0"/>
                <a-gltf-model rotation={`${rotation0} ${rotation1} ${rotation2}`}
                              position={`${translation0} ${translation1} ${translation2}`}
                              scale={`${scale0} ${scale1} ${scale2}`}
                              src="#avatarModel"
                              animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate">
                </a-gltf-model>
            </a-entity>
        </a-scene>
    )
}


