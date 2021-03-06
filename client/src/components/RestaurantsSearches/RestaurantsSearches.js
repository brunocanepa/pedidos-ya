import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../containers/RestaurantsSearches.container';
import styles from './styles';
import './styles.css';
import RestaurantSearchItem from '../RestaurantSearchItem';
import Loading from '../Loading';
import dictionary from '../../localization';

const dic = dictionary.administration.restaurantSearches;

const Searches = function({searches, loading}) {
  const areSearches = !!searches.length;
  return (
    <div style={styles.content}>
      <h3 style={styles.title}>{dic.title}</h3>
      <Loading show={loading}/>
      {!loading && areSearches && <table>
        <tbody>
          <tr>
            <th>{dic.table.number}</th>
            <th>{dic.table.latitude}</th>
            <th>{dic.table.longitude}</th>
          </tr>
          {searches.map((search, i) => <RestaurantSearchItem key={search.id} {...search} i={i+1}/>)}
        </tbody>
      </table>}
      {!loading && !areSearches && <label style={styles.noSearchesLabel}>{dic.noSearches}</label>}
    </div>
  )
};

Searches.propTypes = {
  searches: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Container(Searches);