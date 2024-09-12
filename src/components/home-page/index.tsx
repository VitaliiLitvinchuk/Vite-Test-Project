import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';
import ButtonCounter from './button-counter';

const HomePage = () => {
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div style={{ background: 'inherit' }}>
                <ButtonCounter />
                <p className='mt-2'>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p>
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default HomePage;