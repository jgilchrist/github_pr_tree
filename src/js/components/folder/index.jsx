import React from 'react'
import TreeView from 'react-treeview'
import { StorageSync } from '../../lib'

class Folder extends React.Component {
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

  getHighlight ({ nodeLabel, filter, index }) {
    const prefix = nodeLabel.substring(0, index)
    const middle = nodeLabel.substring(index, index + filter.length)
    const suffix = nodeLabel.substring(index + filter.length)
    return (
      <>
        {prefix}
        {middle ? <span className='github-pr-file-highlight-filter'>{middle}</span> : null}
        {suffix}
      </>
    )
  }

  render () {
    const { children, nodeLabel, isViewed, hasComments, fileCount, filter, hideViewed, hideFilesWithoutComments } = this.props
    const { options = {} } = this.state

    const topClassName = [
      'github-pr-folder-label',
      isViewed && 'github-pr-item-viewed'
    ].filter(Boolean).join(' ')

    const index = filter ? (nodeLabel.toLowerCase() || '').indexOf(filter.toLowerCase()) : -1
    const displayName = (index === -1) ? nodeLabel : this.getHighlight({ nodeLabel, filter, index })

    const display = (
      <div className={topClassName}>
        {displayName} {options.fileCount && fileCount && <span className='github-pr-folder-count-label'>({fileCount})</span>}
      </div>
    )

    const shouldHide = (isViewed && hideViewed) || (!hasComments && hideFilesWithoutComments)

    return (
      shouldHide
        ? null
        : (
          <TreeView nodeLabel={display} defaultCollapsed={false}>
            {children}
          </TreeView>
          )
    )
  }
}

export default Folder
