import React, { useState } from 'react';
import './AddNotes.css';
import axios from 'axios'; // biblioteka do wysyłania żądań HTTP

function Notes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [taskId, setTaskId] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/', {
        title: title,
        content: content,
        taskId: taskId
      });

      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <main>
      <div id="blok">
        <section id="left">
          <form onSubmit={handleSubmit}>
            <input type="text" id="dataInput" name="dataInput" placeholder="Title" required 
              value={title} onChange={e => setTitle(e.target.value)} />
            <br /><br />
            <textarea id="textArea" name="textArea" placeholder="Content"
              value={content} onChange={e => setContent(e.target.value)}></textarea>
            <br />
            <input type="number" id="taskId" name="taskId" placeholder="Task ID" required 
              value={taskId} onChange={e => setTaskId(e.target.value)} />
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
