import React, { useState, useEffect } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import './index.css'

const TimeComp = (props) => {

    const {timezone, changeTime, convert24hrTo12hr, title} = props
    const [angle, setAngle] = useState(0);
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0);

    const updateTime = () => {
        setHours(parseInt(angle / 15))
        const min = (angle / 0.25) % 60
        setMinutes(min)
    }

    useEffect(() => {
        // setAngle((parseInt(((hours * 60) + (minutes))*0.25)))
        changeTime(convert24hrTo12hr(`${hours}:${minutes}`))
    }, [hours, minutes])

    useEffect(updateTime, [angle])


   

    return (
        <div>
            <div className='time'>
                <div>
                    <p>{title}</p>
                    <h1 >{timezone}</h1>
                </div>
            </div>
            <CircularSlider
                label=' IST Time'
                width={200}
                height={200}
                valueFontSize='30px'
                hideLabelValue={true}
                dataIndex={angle}
                onChange={(value) => setAngle(value)}
                className="slider"
            >
            </CircularSlider>

        </div>
    )
};

export default TimeComp;
