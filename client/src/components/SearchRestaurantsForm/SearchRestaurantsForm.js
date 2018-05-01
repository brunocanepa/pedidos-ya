import React from 'react';
import PropTypes from 'prop-types';

import container from '../../containers/SearchRestaurantsForm.container';
import Form from '../Form';

const SearchRestaurantsForm = function ({form}) {
  return (
    <div>
      <Form form={form}/>
    </div>
  );
};

SearchRestaurantsForm.propTypes = {
  form: PropTypes.object.isRequired
};

export default container(SearchRestaurantsForm);