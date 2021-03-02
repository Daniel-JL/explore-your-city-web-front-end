import React, { useState } from 'react';
import styled from 'styled-components';
import {
  NavLink,
} from 'react-router-dom';
import { TellYourStoryButton } from '../stories/buttons';

const PageContainer = styled.div`
  margin-top: 17vh;
  margin-bottom: 12vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageParagraphRow = styled.div`
  display: flex;
  justify-content: center;
  // padding: 1vw;
  padding-bottom: 17vh;

`;

const ImageContainer = styled.div`
  width: 35vw;
  height: 19.4vw;
  padding-right: 4vw;
  padding-left: 4vw;
`;

const Image = styled.img`
  border: 1px solid black;
  width: 35vw;
  height: 19.4vw;

`;

const ParagraphContainer = styled.div`
  width: 35vw;
  padding-right: 4vw;
  padding-left: 4vw;
  font-size: 130%;
`;

const Vision = () => {
  const test = 0;

  return (
    <PageContainer>
      <ImageParagraphRow>
        <ImageContainer>
          <Image />
        </ImageContainer>
        <ParagraphContainer>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue tortor eu consequat faucibus. Cras scelerisque elit magna, a aliquet massa consectetur et. Sed in nisl a lorem fermentum ullamcorper in et diam. Phasellus vitae vulputate felis. Suspendisse efficitur, ligula at semper ornare, elit nisl euismod enim, eget maximus augue felis non quam. Donec dictum nibh vitae magna scelerisque, ac aliquam ipsum consectetur. Donec et tellus nec tellus scelerisque posuere sagittis vel nisi. Proin quis pretium urna, eu laoreet nibh. Maecenas nec vestibulum lectus. Fusce aliquet nec erat ut ullamcorper. Vestibulum consectetur tincidunt dapibus.
        </ParagraphContainer>
      </ImageParagraphRow>

      <ImageParagraphRow>
        <ParagraphContainer>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue tortor eu consequat faucibus. Cras scelerisque elit magna, a aliquet massa consectetur et. Sed in nisl a lorem fermentum ullamcorper in et diam. Phasellus vitae vulputate felis. Suspendisse efficitur, ligula at semper ornare, elit nisl euismod enim, eget maximus augue felis non quam. Donec dictum nibh vitae magna scelerisque, ac aliquam ipsum consectetur. Donec et tellus nec tellus scelerisque posuere sagittis vel nisi. Proin quis pretium urna, eu laoreet nibh. Maecenas nec vestibulum lectus. Fusce aliquet nec erat ut ullamcorper. Vestibulum consectetur tincidunt dapibus.
        </ParagraphContainer>
        <ImageContainer>
          <Image />
        </ImageContainer>
      </ImageParagraphRow>

      <NavLink to="/register">
        <TellYourStoryButton>
          Tell your own Story
        </TellYourStoryButton>
      </NavLink>

    </PageContainer>
  );
};

export default Vision;
