import React from 'react';

export type AvatarProps = Readonly<{
  src: string;
}>;

export const Avatar: React.FunctionComponent<AvatarProps> = props => <div />;

export default Avatar;
