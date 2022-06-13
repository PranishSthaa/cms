import React from 'react'
import { useParams } from 'react-router-dom'

const TakeAttendance = () => {
    const { id } = useParams();
    return (
        <div>TakeAttendance {id}</div>
    )
}

export default TakeAttendance