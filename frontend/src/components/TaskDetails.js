import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'

const TaskDetails = ({ task }) => {

  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/tasks/' + task._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_TASK', payload: json})
    }
  }

  return (
      <div id="task_info">
        <p className='box'>{task.title}</p>
        <p className='box'>{task.date}</p>
        <p className='box'>{task.time}</p>
        <p className='box'>{task.miles}</p>
        <p className='box'>{task.notes}</p>
        <span className='box' onClick={handleClick}>x</span>
      </div>
  )
}

export default TaskDetails
