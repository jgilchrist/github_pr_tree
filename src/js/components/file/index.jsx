import React from 'react'
import { getClassWithColor } from 'file-icons-js'
import DiffStats from '../diffStats'
import { StorageSync } from '../../lib'

class File extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    const options = await StorageSync.get()

    if (this.unmounted) {
      return
    }

    this.setState({ options })
  }

  componentWillUnmount () {
    this.unmounted = true
  }

  getHighlight ({ name, filter, index }) {
    const prefix = name.substring(0, index)
    const middle = name.substring(index, index + filter.length)
    const suffix = name.substring(index + filter.length)
    return (
      <>
        {prefix}
        {middle ? <span className='github-pr-file-highlight-filter'>{middle}</span> : null}
        {suffix}
      </>
    )
  }

  render () {
    const { name, href, hasComments, isDeleted, isVisible, diffStats, filter, isViewed, hidden } = this.props
    const { options = {} } = this.state
    const className = getClassWithColor(name)
    const topClassName = [
      'github-pr-file',
      isVisible && 'github-pr-file-highlight',
      isDeleted && 'github-pr-file-deleted',
      isViewed && 'github-pr-item-viewed'
    ].filter(Boolean).join(' ')

    const index = filter ? (name.toLowerCase() || '').indexOf(filter.toLowerCase()) : -1
    const highlightedName = (index === -1) ? name : this.getHighlight({ name, filter, index })

    return (
      hidden
        ? null
        : (
          <div className={topClassName}>
            <span className={`icon ${className}`} />
            <a href={href} className='link-gray-dark'>{highlightedName}</a>
            {options.diffStats && diffStats && <DiffStats diffStats={diffStats} />}
            {hasComments
              ? (
                <svg className='github-pr-file-comment octicon octicon-comment text-gray' viewBox='0 0 16 16' width='16' height='16' aria-hidden='true'>
                  <path fillRule='evenodd' d='M14 1H2c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h2v3.5L7.5 11H14c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1zm0 9H7l-2 2v-2H2V2h12v8z' />
                </svg>
                )
              : null}
          </div>
          )
    )
  }
}

export default File
