import React from 'react'
import styled from 'styled-components'

const AffirmationsContainer = styled.div`
padding: 10px`

const Affirmation = styled.p`
color: #007acc
font-style: italic
margin-top: 2px`

export const PositiveAffirmations:React.FC = () => {
  return (
    <AffirmationsContainer>
        <h2 className='flex justify-center font-bold'>Positive Affirmations</h2>
        <Affirmation> I can get through this.</Affirmation>
        <Affirmation> I am stronger than I think I am.</Affirmation>
        <Affirmation> When You take a picture of the sky or moon using your phone, it doesn't look as good but you don't say that the sky is ugly you blame the phone for not being able to capture the complete beauty of the sky same as when you take a picture of yourself.</Affirmation>
    </AffirmationsContainer>
  )
}
