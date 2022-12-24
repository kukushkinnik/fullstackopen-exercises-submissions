import React, { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateGood = () => setGood(good + 1);
  const updateNeutral = () => setNeutral(neutral + 1);
  const updateBad = () => setBad(bad + 1);

  return (
    <div className="App">
      <Feedback good={updateGood} neutral={updateNeutral} bad={updateBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + neutral + bad * -1) / total;
  const positive = good * (100 / total);

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
            <Heading>statistics</Heading>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>good</td>
          <td>
            <DisplayInfo amount={good} />
          </td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>
            <DisplayInfo amount={neutral} />
          </td>
        </tr>
        <tr>
          <td>bad</td>
          <td>
            <DisplayInfo amount={bad} />
          </td>
        </tr>
        <tr>
          <td>all</td>
          <td>
            <DisplayInfo amount={total} />
          </td>
        </tr>
        <tr>
          <td>average</td>
          <td>
            <DisplayInfo amount={average.toFixed(1)} />
          </td>
        </tr>
        <tr>
          <td>positive</td>
          <td>
            <DisplayInfo amount={positive.toFixed(1)} /> <>%</>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Feedback = ({ good, neutral, bad }) => {
  return (
    <div>
      <Heading>give feedback</Heading>
      <Button click={good}>good</Button>
      <Button click={neutral}>neutral</Button>
      <Button click={bad}>bad</Button>
    </div>
  );
};

const Button = ({ click, children }) => (
  <button onClick={click}>{children}</button>
);

const DisplayInfo = ({ amount }) => <>{amount}</>;

const Heading = ({ children }) => <h1>{children}</h1>;

export default App;
