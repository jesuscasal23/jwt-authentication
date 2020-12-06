import React, {useState} from 'react'
import {Button, InputLabel, Input, FormControl} from "material-ui/core"

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  }) 

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <h1>this is the login page</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <FormControl>
          <InputLabel>email</InputLabel>
          <Input 
            name="email" 
            type="text" 
            value={data.email} 
            onChange={e => handleChange(e)}> 
          </Input>
        </FormControl>
        <FormControl>
          <InputLabel>password</InputLabel>
          <Input 
            name="password" 
            type="password" 
            value={data.password} 
            onChange={e => handleChange(e)}> 
          </Input>
        </FormControl>
        <Button variant="contained" color="primary">
          Primary
        </Button>
      </form>
    </div>
  )
}

export default LoginPage