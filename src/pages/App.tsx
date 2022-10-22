import { useState } from 'react';

import Books from '../components/Books/Books';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

function App() {
  const [searchText, setSearchText] = useState<string>('');

  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };
  return (
    <>
      <Header onChangeSearchText={handleChangeSearchText} />
      <Books searchText={searchText} />
      <Footer />
    </>
  );
}

export default App;
