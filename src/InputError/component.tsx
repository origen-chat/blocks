import React from 'react';
import styled from 'styled-components';

import { ClassNameProp } from '../types';

const Wrapper = styled.div`
  font-size: var(--xs-font-size);
  color: var(--danger-color-500);
`;

export type InputErrorProps = Readonly<{
  error: string;
}> &
  ClassNameProp;

export const InputError: React.FunctionComponent<InputErrorProps> = props => (
  <Wrapper role="alert" className={props.className}>
    {props.error}
  </Wrapper>
);

export default InputError;
