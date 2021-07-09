import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Posts']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All Posts',
    to: '/posts/all-posts',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Add New',
    to: '/posts/add-new',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Preview',
    to: '/posts/preview',
    icon: 'cil-drop',
  },
]

export default _nav
