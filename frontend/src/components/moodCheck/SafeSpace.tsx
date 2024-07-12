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
import { motion } from 'framer-motion'

const SafeSpaceContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f8ff;
  min-height: 100vh;
  text-align: center;
  margin: 0 auto;
`

const Header = styled(motion.h1)`
  color: #333;
  margin-top: 5rem;
  font-size: 2rem;
`

const Section = styled(motion.section)`
  margin: 20px auto;
  width: 100%;
  max-width: 600px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`

const SafeSpace: React.FC = () => {
  return (
    <SafeSpaceContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        Welcome To Your Safe Space
      </Header>
      <Section
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <BreathingExercise />
      </Section>
      <Section
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <PositiveAffirmations />
      </Section>
      <Section
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <MoodTracker />
      </Section>
      <Section
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <SupportResources />
      </Section>
      <Section
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <GroundingTechniques />
      </Section>
      <Section
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <CalmingVisualSounds />
      </Section>
      <Section
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <PersonalJournal />
      </Section>
      <Section
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <EmergencyPlan />
      </Section>
      <Section
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <CustomizableEnvironment />
      </Section>
    </SafeSpaceContainer>
  )
}

export default SafeSpace
