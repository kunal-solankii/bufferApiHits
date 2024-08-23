import './App.css';
import { Button } from './components/button';
import { useBufferedApiRequests } from './utils/useBufferedApiRequests';
import { API_ENDPOINT } from './EndPoint';

const App = () => {
  
  const sendBufferedRequest = useBufferedApiRequests(API_ENDPOINT);

  const handleSubmit = () => {
    sendBufferedRequest( new Date());
  };

  return (
    <div className='ui-app'>
      <h1>Online/Offline Request Buffer</h1>
      <Button
        title='Request Api'
        onClick={handleSubmit}
      />
    </div>
  );
};


export default App;
