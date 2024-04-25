import React from 'react';
import { FaClock } from "react-icons/fa";
import { HiMiniEyeSlash } from "react-icons/hi2";
import CircularSlider from '@fseehawer/react-circular-slider';
import './index.css'

const TimeComp = (props) => {

    const { timezone, changeTime, title, removeTime } = props

    return (
        <div className='draggable'>
            <div className='time'>
                <div>
                    <h3>{title}</h3>
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
                <FaClock x='10' y='10' />
            </CircularSlider>
            <button className='close-icon' onClick={() => removeTime(title)}>
                <HiMiniEyeSlash />
            </button>
        </div>
    )
};

export default TimeComp;
