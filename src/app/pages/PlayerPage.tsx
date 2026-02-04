import styled from 'styled-components';

import { Page } from '@/components';
import { media } from '@/theme';

import { CommentsPanel, ProjectHeader, VideoPlayer } from '../features';

const src =
  'https://storage.googleapis.com/sohonet-interview-video-sample-public/1040056094289814902/manifests/master_stage_3.m3u8';

export const Player = () => {
  return (
    <Page>
      <ProjectHeader />
      <MainContent>
        <VideoSection>
          <VideoPlayer src={src} />
        </VideoSection>
        <CommentsPanel />
      </MainContent>
    </Page>
  );
};

const MainContent = styled.div`
  display: flex;
  flex: 1;
  background: ${({ theme }) => theme.colors.background.black};
  overflow: hidden;
  min-height: 0;

  ${media.tablet} {
    flex-direction: column;
  }
`;

const VideoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;

  ${media.tablet} {
    flex: none;
    height: 50vh;
    min-height: 300px;
  }

  ${media.mobile} {
    height: 40vh;
    min-height: 250px;
  }
`;
