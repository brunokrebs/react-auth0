import axios from 'axios';
import * as Auth0 from 'auth0-web';

export {
  loadEntityList, editEntity, removeEntity, getRestFlexUrl
}

function loadEntityList(entity, audience, scope) {
  const restFlexUrl = getRestFlexUrl(entity);
  return async function () {
    const entityToken = Auth0.getExtraToken(entity);
    if (!entityToken) {
      await Auth0.silentAuth(entity, audience, scope);
    }
    const config = {
      url: restFlexUrl,
      headers: {'Authorization': 'Bearer ' + Auth0.getExtraToken(entity)}
    };

    const entities = (await axios(config)).data;
    this.setState({
      [entity]: entities
    })
  }
}

function editEntity(entity) {
  return function (id) {
    this.props.history.push(`/${entity}/${id}`);
  }
}

function removeEntity(entity, cb) {
  const restFlexUrl = getRestFlexUrl(entity);
  return async function (id) {
    const config = {
      method: 'delete',
      url: `${restFlexUrl}/${id}`,
      headers: {'Authorization': 'Bearer ' + Auth0.getExtraToken(entity)}
    };
    await axios(config);
    if (cb) cb();
  };
}

function getRestFlexUrl(entityName) {
  const domain = process.env.REACT_APP_BACKEND_DOMAIN;
  const protocol = process.env.REACT_APP_BACKEND_PROTOCOL;

  return `${protocol}://${entityName}.${domain}`
}
