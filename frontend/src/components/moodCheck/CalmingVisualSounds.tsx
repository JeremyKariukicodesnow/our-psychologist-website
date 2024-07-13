import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 10px;
`

const Visual = styled.video`
  width: 100%;
  border-radius: 10px;
`

const SoundButton = styled.button`
  background: #007acc;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
`

export const CalmingVisualSounds: React.FC = () => {
  const [sound, setSound] = useState<HTMLAudioElement | null>(null)
  const [currentSoundUrl, setCurrentSoundUrl] = useState<string | null>(null)

  const playSound = (url: string) => {
    if (sound) {
      if (currentSoundUrl === url) {
        if (sound.paused) {
          sound.play()
        } else {
          sound.pause()
        }
      } else {
        sound.pause()
        const newSound = new Audio(url)
        newSound.play()
        setSound(newSound)
        setCurrentSoundUrl(url)
      }
    } else {
      const newSound = new Audio(url)
      newSound.play()
      setSound(newSound)
      setCurrentSoundUrl(url)
    }
  }

  return (
    <Container>
      <h2>Calming Visuals and Sounds</h2>
      <Visual controls>
        <source src="Keep Holding On - Avril Lavigne (Lyrics) .mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Visual>
      <div>
        <SoundButton onClick={() => playSound('Rachel Platten - Fight Song (Lyrics).mp3')}>Nature Sounds</SoundButton>
        <SoundButton onClick={() => playSound('Sia - The Greatest (Lyrics).mp3')}>White Noise</SoundButton>
        <SoundButton onClick={() => playSound('The Script - Hall Of Fame (Lyrics).mp3')}>Soft Music</SoundButton>
      </div>
    </Container>
  )
}
