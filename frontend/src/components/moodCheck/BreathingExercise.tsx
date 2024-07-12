import React from 'react'
import styled from 'styled-components'

const ExerciseContainer = styled.div`
    padding: 10px`

const Instruction = styled.p`
    color: #007acc`

const BreathingExercise:React.FC = () => {
  return (
    <ExerciseContainer>
        <h2>Guided Breathing Exercise</h2>
        <Instruction>Take a deep breath in through your nose for 4 seconds. Hold for 7 seconds, and exhale slowly through your mouth for 8 seconds. Repeat 3 times.</Instruction>
    </ExerciseContainer>
  )
}

export default BreathingExercise