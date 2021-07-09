import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCard,
  CCardHeader,
  CCardBody,
  CTabs,
  CDataTable,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {list, update} from './api-posts'

const fields = ['title', 'category', 'action']

const AllPosts = () => {
  const [users, setUsers] = React.useState([])
  const [values, setValues] = React.useState({
    error: "",
    redirectToAllPosts: false
  })
  const [count, setCount] =  React.useState({
    Publish: 0,
    Draft: 0,
    Thrash: 0
  })
  const history = useHistory()

  React.useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal, "/article/5/1").then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data.all_results)
        {["Publish", "Draft", "Thrash"].map((stat) => {
          const statCount = data.all_results.filter(({status}) => status === stat).length
          setCount(count => ({ ...count, [stat]: statCount}))
        })}
      }
    })

    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const clickDelete = (item) => {
    const user = {
      title: item.title,
      content: item.content,
      category: item.category,
      status: "Thrash"
    }
    update({
      userId: item.id
    }, user).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, redirectToAllPosts: true})
      }
    })
  }

  if (values.redirectToAllPosts) {
    history.go(0)
  }

  return (
    <CCard>
      <CCardHeader>
        All Posts
      </CCardHeader>
      <CCardBody>
        <CTabs>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink>
                Published ({count.Publish})
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                Drafts ({count.Draft})
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                Thrashed ({count.Thrash})
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane>
              <CCard>
                <CCardBody>
                  <CDataTable
                    items={users.filter(({status}) => status === "Publish")}
                    fields={fields}
                    scopedSlots = {{
                      'action':
                      (item, index) => {
                        return (
                          <td className="py-2">
                            <Link to={"/edit-article/" + item.id}>
                              <CButton
                                color="success"
                                size="sm"
                              >
                                <CIcon size="sm" name="cil-pencil"/>
                              </CButton>
                            </Link>
                            <CButton
                              color="danger"
                              size="sm"
                              onClick={() => {
                                clickDelete(item)
                              }}
                            >
                              <CIcon size="sm" name="cil-trash"/>
                            </CButton>
                          </td>
                        )
                      }
                    }}
                  />
                </CCardBody>
              </CCard>
            </CTabPane>
            <CTabPane>
              <CCard>
                <CCardBody>
                  <CDataTable
                    items={users.filter(({status}) => status === "Draft")}
                    fields={fields}
                    scopedSlots = {{
                      'action':
                      (item, index) => {
                        return (
                          <td className="py-2">
                            <Link to={"/edit-article/" + item.id}>
                              <CButton
                                color="success"
                                size="sm"
                              >
                                <CIcon size="sm" name="cil-pencil"/>
                              </CButton>
                            </Link>
                            <CButton
                              color="danger"
                              size="sm"
                              onClick={() => {
                                clickDelete(item)
                              }}
                            >
                              <CIcon size="sm" name="cil-trash"/>
                            </CButton>
                          </td>
                        )
                      }
                    }}
                  />
                </CCardBody>
              </CCard>
            </CTabPane>
            <CTabPane>
              <CCard>
                <CCardBody>
                  <CDataTable
                    items={users.filter(({status}) => status === "Thrash")}
                    fields={fields}
                    scopedSlots = {{
                      'action':
                      (item, index) => {
                        return (
                          <td className="py-2">
                            <Link to={"/edit-article/" + item.id}>
                              <CButton
                                color="success"
                                size="sm"
                              >
                                <CIcon size="sm" name="cil-pencil"/>
                              </CButton>
                            </Link>
                            <CButton
                              color="danger"
                              size="sm"
                              onClick={() => {
                                clickDelete(item)
                              }}
                            >
                              <CIcon size="sm" name="cil-trash"/>
                            </CButton>
                          </td>
                        )
                      }
                    }}
                  />
                </CCardBody>
              </CCard>
            </CTabPane>
          </CTabContent>
        </CTabs>
      </CCardBody>
    </CCard>
  )
}

export default AllPosts