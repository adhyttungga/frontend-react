import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel
} from '@coreui/react'

import { Redirect } from 'react-router-dom'
import { create, read, update } from './api-posts'

const AddNew = () => {
  const [values, setValues] = React.useState({
    title: "",
    content: "",
    category: "",
    error: "",
    redirectToAllPosts: false
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value})
  }

  const onClick = (name) => {
    const user = {
      title: values.title,
      content: values.content,
      category: values.category,
      status: name
    }
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error})
      } else {
        setValues({ ...values, redirectToAllPosts: true})
      }
    })
  }

  if (values.redirectToAllPosts) {
    return (<Redirect to={"/posts/all-posts"}/>)
  }

  return (
    <CCard>
      <CCardHeader>
        Add New
      </CCardHeader>
      <CCardBody>
        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Title</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput id="title" name="text-input" value={values.title} onChange={handleChange('title')} />
              {/* <CFormText>This is a help text</CFormText> */}
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="textarea-input">Content</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CTextarea 
                rows="9"
                id="content" 
                name="text-input" 
                value={values.content} 
                onChange={handleChange('content')} 
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="text-input">Category</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput id="category" name="text-input" value={values.category} onChange={handleChange('category')}  />
              {/* <CFormText>This is a help text</CFormText> */}
            </CCol>
          </CFormGroup>
        </CForm>
      </CCardBody>
      <CCardFooter>
        <CButton type="reset" size="sm" onClick={() => onClick("Draft")} color="secondary">Draft</CButton>
        <CButton type="submit" size="sm" onClick={() => onClick("Publish")} color="success">Publish</CButton>
      </CCardFooter>
    </CCard>
  )
}

export default AddNew