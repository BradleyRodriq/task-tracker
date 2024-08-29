import { useState } from "react"
import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from '../hooks/useAuthContext'

const TaskForm = () => {
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const [miles, setMiles] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const task = {title, date, time, notes, miles}

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setDate('')
      setTime('')
      setNotes('')
      setMiles('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_TASK', payload: json})
    }
  }

  return (
    <form id="form_container" onSubmit={handleSubmit}>
      <h2>Add a new task</h2>

      <label>Task</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Date</label>
      <input
        type="text"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <label>Time Spent</label>
      <input
        type="text"
        onChange={(e) => setTime(e.target.value)}
        value={time}
        className={emptyFields.includes('time') ? 'error' : ''}
      />

      <label>Miles</label>
      <input
        type="text"
        onChange={(e) => setMiles(e.target.value)}
        value={miles}
        className={emptyFields.includes('miles') ? 'error' : ''}
      />

      <label>Notes</label>
      <textarea
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
        className={emptyFields.includes('notes') ? 'error' : ''}
      ></textarea>

      <button id="submit-btn">Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TaskForm
