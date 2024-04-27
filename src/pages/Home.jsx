import React from 'react'
import Header from '../components/Header'

const Home= () =>{
  return (
    <main className='w-full flex flex-col'>
        <Header 
            title={
                <p>
                    Enjoy all your favorite dishes with 
                    <br /> Jay's Kitchen!
                </p>
            }
            type='home'
           />
        </main>
  )
}

export default Home
 