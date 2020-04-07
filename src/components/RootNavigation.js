import * as React from 'react';
const navigationRef = React.createRef();
export default navigationRef;

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}