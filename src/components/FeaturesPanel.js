import React, { useEffect, useState } from 'react';
import '../assets/css/FeaturesPanel.scss';

export const FeaturePanel= ({product}) => {
    const [data, setData] = useState(product.featurePanels.map(panel => ({ ...panel, expanded: false })));


    // useEffect(() => {
    //     fetch('data/product_prod10550089.json')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data.rs && data.rs.featurePanels) {
    //                 setData(data.rs.featurePanels.map(panel => ({ ...panel, expanded: false })));
    //             } else {
    //                 console.error('Feature panels not found in the response.');
    //             }
    //         })
    //         .catch((error) => console.log('Error fetching data:', error));
    // }, []);

    const togglePanel = (index) => {
        setData(prevData => {
            const updatedData = prevData.map((panel, idx) => ({
                ...panel,
                expanded: idx === index ? !panel.expanded : false // Toggle the clicked panel, close others
            }));
            return updatedData;
        });
    };
    const cleanTitle = (title) => {
        return title.replace('(Click to Expand)', '').trim();
    };
    const AddedMinusMark = ({ expanded }) => (
        <div className="add-minus">
            <div className={`horizontal ${expanded ? 'expanded' : ''}`}></div>
            {!expanded && <div className="vertical"></div>}
        </div>
    );

    return (
        <div className='feature-panel-container'>
            {data.length > 0 ? (
                data.map((panel, index) => (
                    <div key={index}>
                        <div style={{ display: 'flex', alignItems:'center'}}>
                            <img style={{ width: '36px', height: '36px', marginRight: '20px' }} src={panel.iconPath} alt={panel.title} />
                            <h2 style={{ fontSize: '36px' }}>{cleanTitle(panel.title)}</h2>
                            {panel.content && panel.isPanel && (
                                <div onClick={() => togglePanel(index)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                    <AddedMinusMark expanded={panel.expanded} />
                                </div>
                            )}
                        </div>
                        {panel.isPanel && panel.content && (
                            <div style={{
                                marginLeft: '56px',
                                maxHeight: panel.expanded ? '500px' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.3s ease-in-out'
                            }}>
                            <ul>
                                {panel.content.map((item, idx) => {
                                    if (typeof item === 'string' || item instanceof String) {
                                        return <li className={'list-style'} key={idx}>{item}</li>
                                    }
                                })}
                            </ul>
                                {/*{panel.content.includes("Body fabric back: 94% Pima cotton, 6% Lycra® elastane") ? (*/}
                                {/*    <>*/}
                                {/*        <p><strong>Materials</strong></p>*/}
                                {/*        <p className={'list-style-two'}>{panel.content.find(item => item.includes("Body fabric back: 94% Pima cotton, 6% Lycra® elastane"))}</p>*/}
                                {/*        <p><strong>Care</strong></p>*/}
                                {/*        <ul>*/}
                                {/*            {panel.content.filter(item => !item.includes("Body fabric back: 94% Pima cotton, 6% Lycra® elastane")).map((careItem, idx) => (*/}
                                {/*                <li className={'list-style'} key={idx}>{careItem}</li>*/}
                                {/*            ))}*/}
                                {/*        </ul>*/}
                                {/*    </>*/}
                                {/*) : (*/}
                                {/*    <ul>*/}
                                {/*        {panel.content.map((item, idx) => (*/}
                                {/*            <li className={'list-style'} key={idx}>{item}</li>*/}
                                {/*        ))}*/}
                                {/*    </ul>*/}
                                {/*)}*/}
                            </div>
                        )}
                        <hr/>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
