import React, { useState} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 10px`

const Visual = styled.video`
   width: 100%
   border-radius: 10px`

const SoundButton = styled.button`
    background: #007acc;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;`


export const CalmingVisualSounds:React.FC = () => {

    const [sound , setSound] = useState<HTMLAudioElement | null>(null)

    const playSound = (url: string) => {
        if (sound) {
            sound.pause()
        }
        const newSound = new Audio(url)
        newSound.play()
        setSound(newSound)
    }

  return (
    <Container>
        <h2>Calming Visuals and Sounds</h2>
        <Visual controls>
        <source src="path/to/calming-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Visual>
      <div>
        <SoundButton onClick={() => playSound('path/to/nature-sound.mp3')}>Nature Sounds</SoundButton>
        <SoundButton onClick={() => playSound('path/to/white-noise.mp3')}>White Noise</SoundButton>
        <SoundButton onClick={() => playSound('path/to/soft-music.mp3')}>Soft Music</SoundButton>
      </div>
    </Container>
  )
}
