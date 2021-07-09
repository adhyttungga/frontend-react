import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CPagination
} from  '@coreui/react'
import {list} from './api-posts'

const Preview =() => {
  const [currentPage, setCurrentPage] = React.useState(2)
  const [users, setUsers] = React.useState([])
  // const []

  React.useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal, "/article/1/1").then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setUsers(data.all_results.filter(({status}) => status === "Publish"))
        setCurrentPage(2)
      }
    })
    
    return function cleanup() {
      abortController.abort()
    }
  }, [])
  
  
  return (
    <CCard>
      <CCardHeader>
        {users.length !== 0 && users[currentPage-1].title}
      </CCardHeader>
      <CCardBody>
        {users.length !== 0 && users[currentPage-1].category}
        <br/><br/>
        {users.length !== 0 && users[currentPage-1].content}
      </CCardBody>
      <CCardBody>
      {users.length !== 0 && <CPagination
          activePage={currentPage}
          pages={users.length}
          onActivePageChange={setCurrentPage}
        />}
      </CCardBody>
    </CCard>
  )
}

export default Preview