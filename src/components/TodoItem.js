import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import styles from '../styles/modules/todoItem.module.scss'
import { deleteTodo, updateTodo } from '../toolkit/slices/todoSlice'
import { getClasses } from '../utils/getClasses'
import CheckButton from './CheckButton'
import TodoModal from './TodoModal'
import { motion } from 'framer-motion'


// const child = {
//     hidden: { y: 20, opacity: 0 },
//     visibile: {
//         y: 0,
//         opacity: 1
//     }
// }

export default function TodoItem({ todo }) {
    const [updatModalOpen, setUpdatModalOpen] = useState(false)
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (todo.status === 'complete') {
            setChecked(true);
        } else {
            setChecked(false)
        }
    }, [todo.status])

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id))
        toast.success('todo Deleted')
    }
    const handleUpdate = () => {
        setUpdatModalOpen(true)
    }

    const handleCheck = () => {
        setChecked(!checked)
        dispatch(updateTodo({
            ...todo,
            status: checked ? 'incomplete' : 'complete'
        }))
    }
    return (
        <>
            <motion.div className={styles.item}  >
                <div className={styles.todoDetails} >
                    <CheckButton checked={checked} handleCheck={handleCheck} />
                    <div className={styles.texts} >
                        <p className={getClasses([
                            styles.todoText,
                            todo.status === 'complete' && styles['todoText--completed']
                        ])} >{todo.title}</p>
                        <p className={styles.time}>{format(new Date(todo.time), 'p, MM/dd/yyyy')}</p>
                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div className={styles.icon}
                        onClick={handleDelete}
                        onKeyDown={handleDelete}
                        role='button' tabIndex={0}
                    >
                        <MdDelete />
                    </div>
                    <div className={styles.icon}
                        onClick={handleUpdate}
                        onKeyDown={handleUpdate}
                        role='button' tabIndex={0}
                    >
                        <MdEdit />
                    </div>
                </div>
            </motion.div>

            <TodoModal type="update" todo={todo} modalOpen={updatModalOpen} setModalOpen={setUpdatModalOpen} />
        </>
    )
}
