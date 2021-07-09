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
import { read, update } from './api-posts'

const EditArticle = ({ match }) => {
  const [values, setValues] = React.useState({
    title: "",
    content: "",
    category: "",
    error: "",
    redirectToAllPosts: false
  })

  React.useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.postId
    }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setValues({ ...values, 
          title: data.data.title, 
          content: data.data.content, 
          category: data.data.category})
          console.log(data.data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [match.params.postId])

  const handleChange = name => event => {
    setValues(values => ({ ...values, [name]: event.target.value}))
  }

  const onClick = (name) => {
    const user = {
      title: values.title,
      content: values.content,
      category: values.category,
      status: name
    }
    update({
      userId: match.params.postId
    }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, redirectToAllPosts: true})
      }
    })
  }

  if (values.redirectToAllPosts) {
    return (<Redirect to={"/posts/all-posts"}/>)
  }

  return (
    <CCard>
      <CCardHeader>
        Edit Article
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

export default EditArticle