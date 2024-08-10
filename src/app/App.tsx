import { Route, Routes } from 'react-router-dom';
import NotMobile from '../components/not-mobile/not-mobile';
import Wild from '../components/wild/wild';
import useMediaQuery from '../services/hooks/useMediaQuery';
import styles from './App.module.scss';

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  if (!isMobile) {
    return <NotMobile />
  }

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Wild />} index={false} />
      </Routes>
    </div>
  )
}

export default App
