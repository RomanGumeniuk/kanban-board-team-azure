import React, { useState } from 'react';
import axios from 'axios'; // biblioteka do wysyłania żądań HTTP

function Notes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/notes', {
        title: title,
        content: content
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
            <input type="submit" id="submitButton" value="Submit" />
          </form>
        </section>
        <section id="right"></section>
      </div>
    </main>
  );
}

export default Notes;