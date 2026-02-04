import styled from 'styled-components';

import { media } from '@/theme';

type ProjectHeaderProps = {
  projectName?: string;
  versionName?: string;
};

export const ProjectHeader = ({ projectName = 'Project Alpha', versionName = 'v2 Draft' }: ProjectHeaderProps) => {
  return (
    <Container>
      <Left>
        <Title>Review Tool</Title>
        <Divider />
        <ProjectInfo>
          <Label>Projects</Label>
          <ProjectName>
            {projectName} / {versionName}
          </ProjectName>
        </ProjectInfo>
      </Left>
    </Container>
  );
};

const Container = styled.header`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: 8px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  min-height: 48px;

  ${media.mobile} {
    padding: 8px 12px;
    min-height: 44px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${media.mobile} {
    gap: 8px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 15px;
  font-weight: 600;

  ${media.mobile} {
    font-size: 14px;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: ${({ theme }) => theme.colors.border.divider};

  ${media.mobile} {
    display: none;
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${media.mobile} {
    gap: 4px;
  }
`;

const Label = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.tertiary};

  ${media.mobile} {
    display: none;
  }
`;

const ProjectName = styled.span`
  font-size: 13px;
  font-weight: 500;

  ${media.mobile} {
    font-size: 12px;
  }
`;
