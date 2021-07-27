import { Helmet } from 'react-helmet'

import Calculator from './components/Calculator';

const App = () => {
  return (
    <>
      <Helmet>
        <title>原神伤害计算器</title>
      </Helmet>
      <div style={{ textAlign: "center", fontSize: "30px", marginBottom: "50px" }}>原神伤害计算器</div>
      <Calculator />
    </>
  );
}

export default App;
