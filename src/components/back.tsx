import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BackIcon } from './icons'

const Back = () => {
    const nav = useNavigate()
    const back = () => {
      nav(-1)
    }
  return (
    <button onClick={back}
    className="btn btn-ghost drawer-button lg:hidden bg-white"
  >
    <BackIcon className="text-2xl text-text " />

  </button>
  )
}

export default Back