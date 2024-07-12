import React from 'react'
import styled from 'styled-components'

const TechniquesContainer = styled.div`
padding: 10px`

const Instruction = styled.p`
color: #007acc`


export const GroundingTechniques:React.FC = () => {
  return (
    <TechniquesContainer>
        <h2>Grounding Techniques</h2>
        <Instruction>Try the 5-4-3-2-1 technique: Identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.</Instruction>
    
    </TechniquesContainer>
  )
}
