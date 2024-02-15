'use client'

import { signUp } from '@/lib/account';
import React, { useState } from 'react';

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const response = await signUp({name, firstName, lastName, password, confirmPassword})
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
                    First Name:
                    <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    Confirm Password:
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <br />
                <button type='submit'>Register!</button>
          </form>
      </div>
    )
}
