import React from 'react'
import './Home.css'
import LeftSide from '../../components/leftside/LeftSide'
import RightSide from '../../components/rightside/RightSide'

const Home = () => {
  return (
	<div className='home'>
     <LeftSide />
	 <RightSide />
	</div>
  )
}

export default Home