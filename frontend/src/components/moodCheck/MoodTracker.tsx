import React, { useState} from "react";
import styled from "styled-components";

const TrackerContainer = styled.div`
padding: 10px`

const MoodButton = styled.button<{selected: boolean}>`
    background: ${props => (props.selected ? '#007acc' : '#e0e0e0')};
    color: ${props => (props.selected ? '#fff' : '#000')};
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;`


export const MoodTracker:React.FC = () => {
    const [mood, setMood] = useState<string | null>(null)
  
    return (
       <TrackerContainer>
            <h2 className="capitalize">How are you felling today</h2>
            <MoodButton selected={mood === 'happy'} onClick={() => setMood('happy')}>😊 Happy</MoodButton>
            <MoodButton selected={mood === 'sad'} onClick={() => setMood('sad')}>😢 Sad</MoodButton>
            <MoodButton selected={mood === 'anxious'} onClick={() => setMood('anxious')}>😟 Anxious</MoodButton>
            <MoodButton selected={mood === 'angry'} onClick={() => setMood('angry')}>😠 Angry</MoodButton>
       </TrackerContainer>
  )
}
