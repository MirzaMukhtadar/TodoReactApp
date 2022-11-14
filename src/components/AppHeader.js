import React, { useState } from 'react'
import Button from './Button'
import { SelectButton } from './Button'
import styles from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilterStatus } from '../toolkit/slices/todoSlice'
import { MdEdit } from 'react-icons/md'


export default function AppHeader() {
    const [modalOpen, setModalOpen] = useState(false)
    const filterStatus = useSelector((state) => state.todo.filterStatus)

    const dispatch = useDispatch()
    const updateFilter = (e) => {
        dispatch(updateFilterStatus(e.target.value))
    }

    return (
        <>
            <div className={styles.appHeader}>
                <Button variant='primary' onClick={() => setModalOpen(true)} >Add Task</Button>

                <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
                    <option value="all" >all</option>
                    <option value="incomplete" >incomplete</option>
                    <option value="complete" >complete</option>
                </SelectButton>
                <TodoModal type='add' modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div >
        </>
    )
}
