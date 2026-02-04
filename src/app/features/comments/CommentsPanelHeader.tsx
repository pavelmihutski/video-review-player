import styled from 'styled-components';

type CommentsPanelHeaderProps = {
  count: number;
};

export const CommentsPanelHeader = ({ count }: CommentsPanelHeaderProps) => {
  return (
    <Container>
      <Title>Comments ({count})</Title>
      <Filters></Filters>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`;

const Filters = styled.div`
  display: flex;
  gap: 8px;
`;
