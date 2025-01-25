import React from 'react';
import Button from 'published_app';

const App = () => {
  return (
    <div>
      <h1>Welcome to React PWA!</h1>
      <p>This app works offline and can be installed on your device.</p>
      <Button label={'Publish click'}></Button>
      <input type='button' onClick={() => alert('Thanks for clicking')} value={"Please Click Here!"} />
    </div>
  );
};

export default App;
