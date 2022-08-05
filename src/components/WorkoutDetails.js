import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { format } from 'date-fns';

const WorkoutDetails = ({workout}) => {
	const { _id, title, load, reps, createdAt} = workout;
	const { dispatch } = useWorkoutsContext();

	const handleClick = async (e) => {
		const API = "https://workout-tracker-will-h.herokuapp.com";

		try {
			e.preventDefault();
			const response = await fetch(`${API}/api/workouts/${_id}`, {
				method: "DELETE"
			})
			if(response.ok) {
				const json = await response.json();
				dispatch({type: 'DELETE_WORKOUT', payload: json});
			}
		} catch (err) {
			console.error(err);
		}


	}

	return(
		<div className="workout-details">
			<h4>{title}</h4>
			<p><strong>Load (lb): </strong>{load}</p>
			<p><strong>Reps: </strong>{reps}</p>
			<p>{format(new Date(createdAt), 'PPpp')}</p>
			<span onClick={handleClick} className="material-symbols-outlined">delete</span>
		</div>
	)
}

export default WorkoutDetails;