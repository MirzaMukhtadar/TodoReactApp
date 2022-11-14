import React from 'react'
import { Toaster } from 'react-hot-toast'
import { MdEdit } from 'react-icons/md'
import AppContent from './components/AppContent'
import AppHeader from './components/AppHeader'
import PageTitle from './components/PageTitle'
import styles from './styles/modules/app.module.scss'



export default function App() {
  return (
    <>

      <div className='container' >
        <PageTitle><MdEdit />   Todo list   <MdEdit />  </PageTitle>
        <div className={styles.app__wrapper} >
          <AppHeader />
          <AppContent></AppContent>
        </div>
      </div>
      <Toaster
        position='bottom-right'
        toastOptions={
          {
            style: {
              fontSize: '1.4em'
            }
          }
        } />
    </>
  )
}
