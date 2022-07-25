import React from 'react'
import { Notification } from '@mantine/core';


const ReactNotificationComponent=({title,body})=> {
  return (
    <Notification color="yellow" title={title}>
        {body}
      </Notification>
  )
};


export default ReactNotificationComponent