import React from 'react'

const AdditionBlock = (props) => <span className='change-block addition' {...props} />
const DeletionBlock = (props) => <span className='change-block deletion' {...props} />

const DiffStats = ({ diffStats }) => {
  const changeBlocks = []
  for (let i = 0; i < Math.log(diffStats.additions); i++) {
    changeBlocks.push(<AdditionBlock key={`addition-${i}`} />)
  }
  for (let i = 0; i < Math.log(diffStats.deletions); i++) {
    changeBlocks.push(<DeletionBlock key={`deletion-${i}`} />)
  }

  const changeNumber = (diffStats.additions + diffStats.deletions).toLocaleString()

  return (
    <span className='changes'>
      {
        diffStats.additions
          ? <span className='changes-additions'>+{diffStats.additions}</span>
          : null
      }
      {
        changeNumber
          ? <span> </span>
          : null
      }
      {
        diffStats.deletions
          ? <span className='changes-deletions'>-{diffStats.deletions}</span>
          : null
      }
    </span>
  )
}

export default DiffStats
