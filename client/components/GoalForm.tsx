import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { createGoal } from "../features/goals/goalSlice";


function GoalForm() {
  const [text, setText] = useState("");

  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
