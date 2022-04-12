import React from 'react';
import {Text} from 'react-native';

type UserProps = {
  firstName: string;
  lastName: string;
};

export default User = ({firstName, lastName}: UserProps) => {
  return (
    <Text>
      Full Name: {firstName} {lastName}
    </Text>
  );
};
