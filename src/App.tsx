import { useState } from 'react';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Books from './views/Books';

function App() {
  const [searchText, setSearchText] = useState<string>('');

  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };
  return (
    <main>
      <Header onChangeSearchText={handleChangeSearchText} />
      <Books searchText={searchText} />
      <Footer />
    </main>
  );
}

export default App;
