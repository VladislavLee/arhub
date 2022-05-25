import React, { Component } from 'react';
import { Entity } from 'aframe';
import { Collapse } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import FormRender from './FormRender';
import { GeneralComponentType } from '../../constants/components/components';
import Mixins from './Mixins';
import { EntityType } from '../../constants';

interface IProps extends FormComponentProps {
    entity?: Entity;
    generalComponents?: GeneralComponentType[];
    type?: EntityType;
}

class GeneralComponent extends Component<IProps> {
    render() {
        const { entity, form, type, generalComponents } = this.props;
        return (
            <Collapse bordered={false} defaultActiveKey={['general']}>
                <Collapse.Panel key={'general'} header={'Настройки'}>
                    {
                        generalComponents.map((componentName: GeneralComponentType) => {
                            const { schema } = AFRAME.components[componentName] as any;
                            let data;

                            if (entity.object3D) {

                                data = entity.object3D[componentName] as any;

                                const matrix = {
                                    position: {
                                        x: entity.object3D.position.x,
                                        y: entity.object3D.position.y,
                                        z: entity.object3D.position.z
                                    },
                                    rotation: {
                                        x: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.x),
                                        y: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.y),
                                        z: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.z)
                                    },
                                    scale: {
                                        x: entity.object3D.scale.x,
                                        y: entity.object3D.scale.y,
                                        z: entity.object3D.scale.z
                                    },
                                }
                                console.log('saveLocal', matrix)
                                window.localStorage.setItem('matrix', JSON.stringify(matrix));
                                console.log('3d', AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.x))
                                if (componentName === 'rotation') {
                                    data = {
                                        x: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.x),
                                        y: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.y),
                                        z: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.z),
                                    };
                                }
                            } else {
                                if (componentName === 'name') {
                                    if (entity.title) {
                                        data = entity.title;
                                    } else if (entity.id) {
                                        data = entity.id;
                                    } else {
                                        data = entity.tagName.toLowerCase();
                                    }
                                } else {
                                    data = entity.getAttribute(componentName);
                                }
                            }
                            return (
                                <FormRender
                                    key={componentName}
                                    entity={entity}
                                    data={data}
                                    componentName={componentName}
                                    schema={schema}
                                    form={form}
                                />
                            )
                        })
                    }
                    {type === 'entity' && <Mixins entity={entity} />}
                </Collapse.Panel>
            </Collapse>
        );
    }
}

export default GeneralComponent;
