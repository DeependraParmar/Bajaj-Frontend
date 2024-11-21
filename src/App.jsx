import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const firstCall = async() => {
    const response = await axios.get('https://bajaj-backend-fa6r.onrender.com/bfhl');
    console.log(response.status);
  }

  useEffect(() => {
    console.log("First Call() done.....")
    firstCall();
  }, [])

  const handleSubmit = async () => {
    try {
      setError(null);
      const parsedInput = JSON.parse(jsonInput); // Validate JSON
      const response = await axios.post('https://bajaj-backend-fa6r.onrender.com/bfhl', parsedInput);
      setResponseData(response.data);
    } catch (err) {
      setError('Invalid JSON input or server error. Please check and try again.');
      setResponseData(null);
    }
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    const filteredData = selectedOptions.map((option) => ({
      label: option.label,
      value: responseData[option.value],
    }));

    return filteredData.map((item, index) => (
      <div key={index}>
        <strong>{item.label}:</strong> {JSON.stringify(item.value)}
      </div>
    ));
  };

  return (
    <>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div className='footer'>Developed by: <a href="http://deependraparmar.vercel.app" target="_blank" rel="noopener noreferrer">Deependra Parmar 🔥🎯</a></div>
        <h1>JSON Processor: BFHL</h1>
        <b style={{color: 'red'}}>In case of no response, please wait for at least 50 seconds. <br/> It takes about 50 seconds for the backend service to start again.</b> <br /><br />
        <textarea
          rows="8"
          cols="80"
          placeholder='Enter JSON: {"data": ["1", "2", "a", "B"]}'
          value={jsonInput}
          onChange={handleJsonInputChange}
          style={{ marginBottom: '10px', display: 'block' }}
        />
        <button onClick={() => setJsonInput(`${JSON.stringify({ "data": ["M", "1", "334", "4", "B", "Z", "a", "7"] })}`)} style={{ marginBottom: '20px' }}>
          Add test JSON
        </button> &nbsp;
        <button onClick={handleSubmit} style={{ marginBottom: '20px' }}>
          Submit
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {responseData && jsonInput && (
          <>
            <h3>Response</h3>
            <Select
              isMulti
              options={options}
              onChange={setSelectedOptions}
              placeholder="Select fields to display"
            />
            <div style={{ marginTop: '20px' }}>{renderFilteredResponse()}</div>

          </>
        )}
      </div>
    </>
  );
};

export default App;
