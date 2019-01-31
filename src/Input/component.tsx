import styled from 'styled-components';

export type StyledInputProps = Readonly<{
  isInvalid: boolean;
  isPointerOver: boolean;
}>;

export const StyledInput = styled.input<StyledInputProps>`
  font-size: var(--md-font-size);

  padding: var(--sm-padding) var(--sm-padding);

  border-color: ${props =>
    props.isInvalid ? 'var(--danger-color-500)' : 'var(--grey-200)'};
  border-style: solid;
  border-width: var(--xs-border-width);
  border-radius: var(--sm-border-radius);
  outline: none;
  transition: var(--sm-transition);

  &:focus {
    border-color: ${props =>
      props.isInvalid ? 'var(--danger-color-500)' : 'var(--primary-color-500)'};
  }

  &:not(:focus) {
    ${props => props.isPointerOver && 'border-color: var(--grey-300);'}
  }

  &:disabled {
    background-color: var(--grey-200);
    cursor: not-allowed;
  }
`;

export default StyledInput;
