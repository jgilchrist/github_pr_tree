import React from 'react'
import { isFileViewed } from './lib'
import File from './components/file'
import Folder from './components/folder'

export const createTree = ({ nodeLabel, list, href, hasComments, isDeleted, diffElement, diffStats, visibleElement, filter, fileCount, hideViewed, hideFilesWithoutComments }) => {
  if (href) {
    const isVisible = (diffElement === visibleElement)
    const isViewed = isFileViewed(diffElement)

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
        hideViewed={hideViewed}
        hideFilesWithoutComments={hideFilesWithoutComments}
      />
    )
  }

  const rawChildren = list.map(node => createTree({ ...node, visibleElement, filter, hideViewed, hideFilesWithoutComments }))

  return (
    <Folder
      key={nodeLabel}
      nodeLabel={nodeLabel}
      fileCount={fileCount}
      isViewed={rawChildren.every(child => child.props.isViewed)}
      hasComments={rawChildren.some(child => child.props.hasComments)}
      hideViewed={hideViewed}
      hideFilesWithoutComments={hideFilesWithoutComments}
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
