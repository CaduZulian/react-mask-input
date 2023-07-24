import React from 'react';
import './App.css';
import { Input } from './components/Input';

export default function App() {
  return <Input mask='+55 (99) 99999-9999' maskChar='_' />;
}
