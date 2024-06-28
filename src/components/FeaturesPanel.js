import React, { useState } from 'react';
import '../assets/css/FeaturesPanel.scss';

export const FeaturePanel = ({ product }) => {
    const [data, setData] = useState(product.featurePanels.map(panel => ({ ...panel, expanded: false })));

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

    const parseProductData = (content) => {
        const material = [];
        const care = [];
        let isMaterial = true;

        content.forEach((section) => {
            if (isMaterial) {
                if (section.match(/Wash|Spot|Machine|Do|Tumble|Imported|Do not/)) {
                    isMaterial = false; // Switch to care section
                }
            }
            if (isMaterial) {
                material.push(section);
            } else {
                care.push(section);
            }
        });
        return { material, care };
    };

    return (
        <div className='feature-panel-container'>
            {data.length > 0 ? (
                data.map((panel, index) => (
                    <div key={index}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
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
                                {panel.title.includes('Material and care') ? (
                                    <div>
                                        {panel.content.length > 0 ? (
                                            <div>
                                                <h2>Materials</h2>
                                                <ul>
                                                    {parseProductData(panel.content).material.map((matItem, matIdx) => (
                                                        <li className={'list-style'} key={matIdx}>{matItem}</li>
                                                    ))}
                                                </ul>
                                                <h2>Care</h2>
                                                <ul>
                                                    {parseProductData(panel.content).care.map((careItem, careIdx) => (
                                                        <li className={'list-style'} key={careIdx}>{careItem}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p>No material and care information available.</p>
                                        )}
                                    </div>
                                ) : (
                                    <ul>
                                        {panel.content.map((item, idx) => (
                                            <li className={'list-style'} key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        <hr />
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};





// import React, { useEffect, useState } from 'react';
// import '../assets/css/FeaturesPanel.scss';
//
//
// export const FeaturePanel= ({product}) => {
//     const [data, setData] = useState(product.featurePanels.map(panel => ({ ...panel, expanded: false })));
//     const togglePanel = (index) => {
//         setData(prevData => {
//             const updatedData = prevData.map((panel, idx) => ({
//                 ...panel,
//                 expanded: idx === index ? !panel.expanded : false // Toggle the clicked panel, close others
//             }));
//             return updatedData;
//         });
//     };
//     const cleanTitle = (title) => {
//         return title.replace('(Click to Expand)', '').trim();
//     };
//     const AddedMinusMark = ({ expanded }) => (
//         <div className="add-minus">
//             <div className={`horizontal ${expanded ? 'expanded' : ''}`}></div>
//             {!expanded && <div className="vertical"></div>}
//         </div>
//     );
//
//     return (
//         <div className='feature-panel-container'>
//             {data.length > 0 ? (
//                 data.map((panel, index) => (
//                     <div key={index}>
//                         <div style={{ display: 'flex', alignItems:'center'}}>
//                             <img style={{ width: '36px', height: '36px', marginRight: '20px' }} src={panel.iconPath} alt={panel.title} />
//                             <h2 style={{ fontSize: '36px' }}>{cleanTitle(panel.title)}</h2>
//                             {panel.content && panel.isPanel && (
//                                 <div onClick={() => togglePanel(index)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
//                                     <AddedMinusMark expanded={panel.expanded} />
//                                 </div>
//                             )}
//                         </div>
//                         {panel.isPanel && panel.content && (
//                             <div style={{
//                                 marginLeft: '56px',
//                                 maxHeight: panel.expanded ? '500px' : '0',
//                                 overflow: 'hidden',
//                                 transition: 'max-height 0.3s ease-in-out'
//                             }}>
//                             <ul>
//                                 {panel.content.map((item, idx) => {
//                                     if (typeof item === 'string' || item instanceof String) {
//                                         return <li className={'list-style'} key={idx}>{item}</li>
//                                     }
//                                 })}
//                             </ul>
//                             </div>
//                         )}
//                         <hr/>
//                     </div>
//                 ))
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };
