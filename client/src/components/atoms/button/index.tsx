import React from 'react';

interface propsType {
    title : string;
    onclick : () => void
}
const Button= ({title,onclick}: propsType):JSX.Element => {
  return (
    <section role="button" onClick={onclick}>{title}</section>
  )
}

export default Button