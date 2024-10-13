
import React, { useState, useEffect } from 'react';
import { fetchImageById,} from './services/image.service';
import { fetchSegmentationByImageId } from './services/segmentation.service';


function App() {
  const [data, setData] = useState(null);
  const S3_BUCKET_URL = process.env.REACT_APP_S3_URL;

  useEffect(() => {
    fetchImageById(44)
      .then(res => setData(res))
      .then(data=> console.log(data)
      )
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  

   
   
  return (
    <div className="App">
      <header className="bg-gradient-to-r from-blue-800 to-indigo-900">
      <div>
      {data && data.url ? (
            <img src={`${S3_BUCKET_URL}/${data.url}`} alt="image" />
          ) : (
            <p>Loading...</p>
          )}
    </div>
        <p className=''>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
