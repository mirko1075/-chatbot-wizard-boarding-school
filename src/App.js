import { useEffect, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import data from './data/data.json';
import './App.css';
import ResultComponent from './components/ResultComponent';

function App() {
  const [steps, setSteps] = useState([]);

  let timeout;

  const config = {
    width: '50vw',
    height: '100vh',
    floating: false,
    headerTitle: "Boarding school wizard"
  };

  const theme = {
    background: 'white',
    fontFamily: 'Arial, Helvetica, sans-serif',
    headerBgColor: '#00B2B2',
    headerFontColor: '#fff',
    headerFontSize: '25px',
    botBubbleColor: '#00B2B2',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4c4c4c'
  };

  useEffect(() => {
    const array = [];
    let k = 1;
    const el0 = {
      id: k,
      message: "Please reply to the following questions in order to be placed in the correct house",
      trigger: k + 1
    };
    array.push(el0);
    k++;
    data.forEach(el => {
      const el1 = {
        id: k,
        message: el.title,
        trigger: k + 1
      };
      k++;
      const el2 = {
        id: k,
        options: el.answers.map(ans => {
          return { value: ans.title, label: ans.title, trigger: k+1};
        })
      };
      k++;
      array.push(el1, el2);
    });
    const calculateEl = {
      id: k,
      message: 'Calculating the house you belong.....',
      trigger: k+1,
    };
    array.push(calculateEl);
    k++;
    const finalEl = {
      id: k,
      component: <ResultComponent  />,
      asMessage: true,
      end: true
    };
    array.push(finalEl);

    setSteps([...array]);
    return () => timeout && clearTimeout(timeout);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
       {
          steps?.length && (
            <ChatBot
              {...config}
              steps={steps}
            />
          )
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
