import axios from 'axios';
import * as Auth0 from 'auth0-web';

export {
  loadEntityList, editEntity, removeEntity
}

function loadEntityList(entity) {
  return async function() {
    const config = {
      url: `${process.env.REACT_APP_FLEX_REST}/${entity}`,
      headers: {'Authorization': 'Bearer ' + Auth0.getExtraToken(entity)}
    };

    const entities = (await axios(config)).data;
    this.setState({
      [entity]: entities
    })
  }
}

function editEntity(entity) {
  return function(id) {
    this.props.history.push(`/${entity}/${id}`);
  }
}

function removeEntity(entity, cb) {
  return async function(id) {
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_FLEX_REST}/${entity}/${id}`,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
    };
    await axios(config);
    if (cb) cb();
  };
}
