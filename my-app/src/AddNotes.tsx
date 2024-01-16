import React, { useState, ChangeEvent } from "react";
import axios from "axios";

type TaskStatus = "To Do" | "In Progress" | "For Review" | "Completed";

function Notes() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [taskId, setTaskId] = useState<number>(0);
  const [status, setStatus] = useState<TaskStatus>("To Do");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/", {
        title: title,
        content: content,
        taskId: taskId,
        status: status,
      });

      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <main>
      <div id="blok">
        <section id="left">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="dataInput"
              name="dataInput"
              placeholder="Title"
              required
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <br />
            <br />
            <textarea
              id="textArea"
              name="textArea"
              placeholder="Content"
              value={content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
            ></textarea>
            <br />
            <input
              type="number"
              id="taskId"
              name="taskId"
              placeholder="Task ID"
              required
              value={taskId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTaskId(Number(e.target.value))
              }
            />
            <br />
            <select
              id="taskStatus"
              name="taskStatus"
              value={status}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setStatus(e.target.value as TaskStatus)
              }
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>For Review</option>
              <option>Completed</option>
            </select>
            <br />
            <input type="submit" id="submitButton" value="Submit" />
          </form>
        </section>
        <section id="right"></section>
      </div>
    </main>
  );
}

export default Notes;
