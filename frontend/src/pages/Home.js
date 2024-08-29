import { useEffect }from 'react'
import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import TaskDetails from '../components/TaskDetails'
import TaskForm from '../components/TaskForm'

const Home = () => {
  const {tasks, dispatch} = useTasksContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/tasks', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TASKS', payload: json})
      }
    }

    if (user) {
      fetchTasks()
    }
  }, [dispatch, user])

  return (
    <div id="home">
      <TaskForm />
      <div id="scrollable">
      <div id="wrapper">
        <div className='box a'>Name</div>
        <div className='box a'>Date</div>
        <div className='box a'>Time</div>
        <div className='box a'>Miles</div>
        <div className='box a'>Notes</div>
        <div className='box a'>Delete</div>
        {tasks && tasks.map((task) => (
          <TaskDetails key={task._id} task={task} />
        ))}
      </div>
      </div>
    </div>
  )
}

export default Home
