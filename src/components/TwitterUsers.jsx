import { useEffect, useState } from 'react'
import { users } from '../services/names'
import { TwitterUserCard } from './TwitterUserCard.jsx'

export function TwitterUsers () {

  const [names, setNames] = useState([])

  useEffect(() => {
    setNames(users);
  }, [names])

  return (
    <>
        <section className='App'>
        {
          names.map(({ userName, name, isFollowing}) => (
              <TwitterUserCard
                key={userName}
                userName={userName}
                initialIsFollowing={isFollowing}
              >{name}</TwitterUserCard>
          ))
        }
            </section>
    </>
  )
}
