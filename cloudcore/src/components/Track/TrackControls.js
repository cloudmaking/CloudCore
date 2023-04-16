import React from 'react';
import './TrackControls.scss';
import { Knob, Pointer, Arc, Value } from 'rc-knob'


const TrackControls = ({
    onDelete,
    onSolo,
    onMute,
    onVolumeChange,
    onBalanceChange,
    onInputSourceChange,
}) => {
    return (
        <div className="track-controls">
            <label>
                <select onChange={onInputSourceChange}>
                    <option value="input1">Input 1</option>
                    <option value="input2">Input 2</option>
                    <option value="input3">Input 3</option>
                    {/* Add more input sources as needed */}
                </select>
            </label>

            <button onClick={onSolo}>S</button>
            <button onClick={onMute}>M</button>
            <div className="waveform-viewer">
                {/* You can add the waveform viewer component here */}
            </div>
            <label>
                Volume
                <Knob
                    size={50}
                    angleOffset={220}
                    angleRange={280}
                    min={0}
                    max={100}
                    className="volume-value"
                    onChange={value => console.log(value)}
                >
                    <Arc
                        arcWidth={1.5}
                    />
                    <circle r="20" cx="25" cy="25" />
                    <Pointer
                        width={1}
                        height={17}
                        radius={5}
                        type="rect"
                        color="#fff"
                    />
                </Knob>
            </label>
            <label>
                Balance
                <Knob
                    size={50}
                    angleOffset={220}
                    angleRange={280}
                    min={-100}
                    max={100}
                    className="balance-value"
                    onChange={value => console.log(value)}
                >
                    <Arc
                        arcWidth={1.5}
                    />
                    <circle r="20" cx="25" cy="25" />
                    <Pointer
                        width={1}
                        height={17}
                        radius={5}
                        type="rect"
                        color="#fff"
                    />
                </Knob>
            </label>
            <button className="delete-track-button" onClick={onDelete}>X</button>
        </div>
    );
};

export default TrackControls;
