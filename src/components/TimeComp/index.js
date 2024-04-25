import React from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import './index.css'

const TimeComp = (props) => {

    const {timezone, changeTime, title} = props

    return (
        <div>
            <div className='time'>
                <div>
                    <p>{title}</p>
                    <h1 >{timezone[0]}</h1>
                </div>
            </div>
            <CircularSlider
                width={200}
                height={200}
                valueFontSize='30px'
                hideLabelValue={true}
                dataIndex={timezone[1]}
                onChange={(value) => changeTime(value)}
                className="slider"
            >
            </CircularSlider>

        </div>
    )
};

export default TimeComp;
