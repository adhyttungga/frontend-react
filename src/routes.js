import React from 'react';

const AllPosts = React.lazy(() => import('./views/posts/AllPosts'))
const AddNew = React.lazy(() => import('./views/posts/AddNew'))
const Preview = React.lazy(() => import('./views/posts/Preview'))
const EditArticle = React.lazy(() => import('./views/posts/EditArticle'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/posts', name: 'Posts', component: AllPosts, exact: true},
  { path: '/posts/all-posts', name: 'All Posts', component: AllPosts},
  { path: '/posts/add-new', name: 'Add New', component: AddNew},
  { path: '/posts/preview', name: 'Preview', component: Preview},
  { path: '/edit-article/:postId', name: 'Edit Article', component: EditArticle},
];

export default routes;
