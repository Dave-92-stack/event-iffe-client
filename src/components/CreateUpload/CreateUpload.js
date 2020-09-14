
import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from './config'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './App.css'

function CreateUpload () {
  const [selected, setSelected] = useState(null)
  const [upload, setUpload] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    console.log(event.target.files[0])
    setSelected(event.target.files[0])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    const data = new FormData()
    data.append('upload', selected)
    axios({
      url: apiUrl + '/uploads',
      method: 'POST',
      data
      // data:data
    })
      .then(res => setUpload(res.data.upload))
      .then(() => setLoading(false))
      .catch(console.error)
  }

  return (
    <div className="App">
      {upload.url ? (<img className="display-image" alt={upload.url} src={upload.url}/>) : ''}
      {loading ? (<img alt="loading gif" src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />) : ''}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.File id="upload-file-input" label="Upload File Here" onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default CreateUpload
