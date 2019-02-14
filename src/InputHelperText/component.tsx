import React from 'react';
import styled from 'styled-components';

import { ClassNameProp } from '../types';

const Wrapper = styled.div`
  font-size: var(--xs-font-size);
  color: var(--dark-tertiary-text-color);
`;

export type InputHelperTextProps = Readonly<{
  text: string;
}> &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'id'> &
  ClassNameProp;

export const InputHelperText: React.FunctionComponent<
  InputHelperTextProps
> = props => (
  <Wrapper id={props.id} className={props.className}>
    {props.text}
  </Wrapper>
);

export default React.memo(InputHelperText);
