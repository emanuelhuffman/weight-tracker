import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLog, setIsEditing } from "../features/logs/logSlice";
import todayDate from "../utils/dateFormat";

function LogForm() {
  const initialExercise = {
    name: "",
    weight: 0,
    sets: 0,
    reps: 0,
  };
  const [date, setDate] = useState(todayDate());
  const [exercise, setExercise] = useState(initialExercise);
  const [exercises, setExercises] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const { name, weight, sets, reps } = exercise;

  const { curLogId, logs } = useSelector((state) => state.logs);

  const dispatch = useDispatch();

  const foundLog = logs.filter((el) => el._id === curLogId)[0];
  if (exercises.length === 0 && !hasLoaded) {
    setDate(foundLog.date.slice(0, foundLog.date.indexOf("T")));
    setExercises(foundLog.exercises);
    setHasLoaded(true);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateLog([curLogId, { date, exercises }]));

    setExercise(initialExercise);
    setExercises([]);
  };

  const onChange = (e) => {
    setExercise((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addExercise = (e) => {
    setExercises((prevState) => [
      ...prevState,
      { name: name, weight: weight, sets: sets, reps: reps },
    ]);
    setExercise(initialExercise);
  };

  const removeExercise = (index) => {
    setExercises((prevState) => prevState.filter((ex, i) => i !== index));
  };

  const onCancel = () => {
    dispatch(setIsEditing(false));
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="exercise-section">
          <div className="form-group exercise-name">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Exercise Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group form-row">
            <div>
              <label>Weight</label>
              <input
                type="number"
                name="weight"
                id="weight"
                value={weight}
                placeholder="Exercise weight"
                onChange={onChange}
              />
            </div>
            <div>
              <label>Sets</label>
              <input
                type="number"
                name="sets"
                id="sets"
                value={sets}
                placeholder="Exercise sets"
                onChange={onChange}
              />
            </div>
            <div>
              <label>Reps</label>
              <input
                type="number"
                name="reps"
                id="reps"
                value={reps}
                placeholder="Exercise reps"
                onChange={onChange}
              />
            </div>
          </div>
          <button className="btn btn-add" type="button" onClick={addExercise}>
            Add Exercise
          </button>
          <div className="exercise-list">
            {exercises.map((ex, index) => (
              <div key={index} onClick={() => removeExercise(index)}>
                {ex.name} - {ex.weight}lbs - {ex.sets}s - {ex.reps}r
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <div className="edit-btns">
            <button
              className="btn btn-block"
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </button>
            <div></div>
            <button className="btn btn-block" type="submit">
              Update Log
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default LogForm;
