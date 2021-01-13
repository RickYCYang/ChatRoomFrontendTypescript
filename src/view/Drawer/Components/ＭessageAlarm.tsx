import React from 'react';

interface propInterface{
    newMessageCount: number
}

const ＭessageAlarm = React.memo((props: propInterface) => {
    const {newMessageCount} = props;
    return(
        <div className='message-alarm'>{newMessageCount}</div>
    )
}, (prevProps: propInterface, nextProps: propInterface): boolean => {
    return (prevProps.newMessageCount === nextProps.newMessageCount);
})
export default ＭessageAlarm;