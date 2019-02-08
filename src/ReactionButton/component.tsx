import React from 'react';
import styled from 'styled-components';

const Button = styled.button``;

export type ReactionButtonProps = Readonly<
  {
    isReacted: boolean;
    reactionCount: number;
    onClick: () => void;
  } & (
    | { reactionImageSrc: string; reactionCharacter?: undefined }
    | { reactionCharacter: string; reactionImageSrc?: undefined })
>;

export const ReactionButton: React.FunctionComponent<
  ReactionButtonProps
> = props => {
  return <Button onClick={props.onClick}>d</Button>;
};

export default React.memo(ReactionButton);
