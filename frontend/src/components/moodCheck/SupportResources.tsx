import React from "react";
import styled from "styled-components";

const ResourcesContainer = styled.div`
padding: 10px`

const ResourceLink = styled.a`
  display: block;
  color: #007acc;
  text-decoration: none;
  margin: 5px 0;`

export const SupportResources:React.FC = () => {
  return (
        <ResourcesContainer>
            <h2>Support Resources</h2>
            <ResourceLink href="tel:1234567890">Crisis Hotline: 123-456-7890</ResourceLink>
            <ResourceLink href="https://www.mentalhealth.org">Mental Health Foundation</ResourceLink>
            <ResourceLink href="https://www.supportgroups.com">Online Support Groups</ResourceLink>
        </ResourcesContainer>
  )
}
