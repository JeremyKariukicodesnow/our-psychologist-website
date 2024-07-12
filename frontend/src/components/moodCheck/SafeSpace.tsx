import React from 'react'
import BreathingExercise from './BreathingExercise'
import { PositiveAffirmations } from './PositiveAffirmations'
import { MoodTracker } from './MoodTracker'
import { SupportResources } from './SupportResources'
import { GroundingTechniques } from './GroundingTechniques'
import { CalmingVisualSounds } from './CalmingVisualSounds'
import { PersonalJournal } from './PersonalJournal'
import { EmergencyPlan } from './EmergencyPlan'
import { CustomizableEnvironment } from './CustomizableEnvironment'
import styled from 'styled-components'
//import './SafeSpace.css'

const SafeSpaceContainer = styled.div`
  padding: 20px
  display: flex
  flex-direction: column
  align-items: center
  background: #f0f8ff
  min-height: 100vh
  text-align: center
  margin: 0 auto
  `

const Header = styled.h1`
 color: #007acc`

const Section = styled.section`
  margin: 20px auto;
  width: 100%;
  max-width: 600px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  `


const SafeSpace:React.FC = () => {
  return (
    <SafeSpaceContainer>
        <Header>Welcome To Your Safe Space</Header>
        <Section>
            <BreathingExercise />
        </Section>
        <Section>
            <PositiveAffirmations />
        </Section>
        <Section>
            <MoodTracker />
        </Section>
        <Section>
            <SupportResources />
        </Section>
        <Section>
            <GroundingTechniques />
        </Section>
        <Section>
            <CalmingVisualSounds />
        </Section>
        <Section>
            <PersonalJournal />
        </Section>
        <Section>
            <EmergencyPlan />
        </Section>
        <Section>
            <CustomizableEnvironment />
        </Section>


    </SafeSpaceContainer>
  )
}

export default SafeSpace