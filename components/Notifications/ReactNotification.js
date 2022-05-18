import React from 'react'
import { Notification } from '@mantine/core';
import PropTypes from 'prop-types'

const ReactNotificationComponent=({title,body})=> {
  return (
    <Notification color="yellow" title={title}>
        {body}
      </Notification>
  )
};
// ReactNotificationComponent.propTypes={
//     title:PropTypes.string,
//     body:PropTypes.string,
// };

export default ReactNotificationComponent