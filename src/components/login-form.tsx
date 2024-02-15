'use client'

import React, { useState } from 'react'
import { signIn } from '@/lib/account';

export const LoginForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await signIn({name, password})
    console.log(response);

  }

  return (
    <div>
        <form onSubmit={(e) => onSubmit(e)}>
            <label>
                Username:
                <input type="text" name="username" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type='submit'>Login!</button>
        </form>
    </div>
  )
}
