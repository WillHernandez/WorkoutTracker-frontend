import { useState } from "react";
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
	const { dispatch } = useWorkoutsContext();
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState(0);
	const [reps, setReps] = useState("");
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);

	const handleSubmit = async (e) => {
		const API = "https://workout-tracker-will-h.herokuapp.com";

		try {
			e.preventDefault();
			const workout = { title, load, reps };
			const response = await fetch(`${API}/api/workouts/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(workout)
			})
			const json = await response.json();
			
			if(response.ok) {
				setTitle("");
				setLoad(0);
				setReps("");
				setError(null);
				setEmptyFields([]);
				console.log('new workout added', json);
				dispatch({type: "CREATE_WORKOUT", payload: json});
			} else {
				setError(json.err);
				setEmptyFields(json.emptyFields);
			}
		} catch(e) {
			setError(e);
		}
	}

	return(
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a new workout</h3>

			<label>Excercise Title</label>
			<input 
				type="text" 
				onChange={e => setTitle(e.target.value)} 
				value={title} 
				className={emptyFields.includes('title') ? "error" : ""}
			/>

			<label>Load (in LB)</label>
			<input 
				type="number" 
				onChange={e => setLoad(e.target.value)} 
				value={load} 
				placeholder="0"
			/>
			
			<label>Reps</label>
			<input 
				type="number" 
				onChange={e => setReps(e.target.value)} 
				value={reps} 
				placeholder="0"
				className={emptyFields.includes('reps') ? "error" : ""}
			/>

			<button>Add Workout</button>
			{error && <div className="error">{error}</div>}
		</form>
	)
}

export default WorkoutForm;