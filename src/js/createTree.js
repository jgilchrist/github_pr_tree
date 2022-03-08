import React from 'react'
import { isFileViewed } from './lib'
import File from './components/file'
import Folder from './components/folder'

export const createTree = ({ nodeLabel, list, href, hasComments, isDeleted, diffElement, diffStats, visibleElement, filter, hideViewed, hideFilesWithoutComments }) => {
  if (href) {
    const isVisible = (diffElement === visibleElement)
    const isViewed = isFileViewed(diffElement)
    const shouldHide = (isViewed && hideViewed) || (!hasComments && hideFilesWithoutComments)

    return (
      <File
        key={href}
        name={nodeLabel}
        href={href}
        hasComments={hasComments}
        isDeleted={isDeleted}
        isVisible={isVisible}
        diffStats={diffStats}
        isViewed={isViewed}
        filter={filter}
        hidden={shouldHide}
      />
    )
  }

  const rawChildren = list.map(node => createTree({ ...node, visibleElement, filter, hideViewed, hideFilesWithoutComments }))
  const numberOfDirectChildren = rawChildren.filter(c => c.props.href && !c.props.hidden).length
  const numberOfChildrenOfChildFolders = rawChildren.filter(c => !!c.props.fileCount).map(c => c.props.fileCount).reduce((partialSum, a) => partialSum + a, 0)
  const fileCount = numberOfDirectChildren + numberOfChildrenOfChildFolders
  const childrenAreViewed = rawChildren.every(child => child.props.isViewed)
  const shouldHide = rawChildren.every(child => child.props.hidden)

  return (
    <Folder
      key={nodeLabel}
      nodeLabel={nodeLabel}
      fileCount={fileCount}
      isViewed={childrenAreViewed}
      hidden={shouldHide}
      filter={filter}
    >
      {rawChildren.map(node => (
        <span key={node.key}>
          {node}
        </span>
      ))}
    </Folder>
  )
}
