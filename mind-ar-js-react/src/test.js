import React, { useEffect, useRef } from 'react';
import {useParams} from "react-router-dom";

export default () => {
    const sceneRef = useRef(null);
    const {markerImageId, modelId, rotation0, rotation1, rotation2, translation0, translation1, translation2, scale0, scale1, scale2} = useParams()

    const contentUrl = 'https://datastore-route-nikitadyadechkin-1-dev.apps.sandbox.x8i5.p1.openshiftapps.com/content';

    useEffect(() => {
        const sceneEl = sceneRef.current;
        const arSystem = sceneEl.systems["mindar-image-system"];
        sceneEl.addEventListener('renderstart', () => {
            arSystem.start(); // start AR
        });
        return () => {
            arSystem.stop();
        }
    }, []);

    return (
        <a-scene ref={sceneRef} mindar-image={`imageTargetSrc: ${contentUrl}/${markerImageId}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`} color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
            <a-assets>
                <a-asset-item id="avatarModel" src={`${contentUrl}/${modelId}`}></a-asset-item>
            </a-assets>

            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

            <a-entity mindar-image-target="targetIndex: 0">
                <a-gltf-model rotation={`${rotation0} ${rotation1} ${rotation2}`}
                              position={`${translation0} ${translation1} ${translation2}`}
                              scale={`${scale0} ${scale1} ${scale2}`}
                              src="#avatarModel"
                              >
                </a-gltf-model>
            </a-entity>


        </a-scene>
    )
}
