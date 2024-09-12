import { useState } from 'react'

const ButtonCounter = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <button className='btn btn-outline-light w-25 mx-auto' onClick={() => setCount((count) => count + 1)}>
            <b>count is {count}</b>
        </button>
    )
}

export default ButtonCounter;