import React from 'react';

import Container from '../../containers/Root.container';
import styles from './styles';
import Header from '../Header';
import Navigator from '../Navigator';


const Root = function ({signedIn}) {
  return (
    <div>
      <Header/>
      <div style={styles.content}>
        <Navigator signedIn={signedIn} />
      </div>
    </div>
  );
};

export default Container(Root);