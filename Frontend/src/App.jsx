import { useState } from 'react'
import { Button } from './components/ui/button'
import {PopoverDemo} from './_compo/PopOver'

function App() {
  const [count, setCount] = useState(0)

  return (
    <PopoverDemo />
  )
}

export default App
