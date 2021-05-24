export default function installModule(Vue, store, rootState, path, rawModule) {
  if (path.length > 0) {
    let parentState = path.slice(0, -1).reduce((root, current) => {
      return rootState[current];
    }, rootState);
    
    
    Vue.set(parentState, path[path.length - 1], rawModule.state ? rawModule.state : {});
  }

  let getters = rawModule._raw.getters;
  if (getters) {
    Object.keys(getters).forEach(getterName => {
      Object.defineProperty(store.getters, getterName, {
        get() {
          return getters[getterName](rawModule.state);
        }
      });
    });
  }

  let mutations = rawModule._raw.mutations;
  if (mutations) {
    Object.keys(mutations).forEach(mutationName => {
      store.mutations[mutationName] = store.mutations[mutationName] ?
        store.mutations[mutationName] : [];
      store.mutations[mutationName].push(payload => {
        mutations[mutationName](rootState, payload);
      });
    });
  }

  let actions = rawModule._raw.actions;
  if (actions) {
    Object.keys(actions).forEach(actionName => {
      store.actions[actionName] = store.actions[actionName] ?
        store.actions[actionName] : [];
      store.actions[actionName].push(payload => {
        actions[actionName](store, payload);
      });
    });
  }

  if (rawModule._children) {
    Object.keys(rawModule._children).forEach(moduleName => {
      installModule(Vue, store, rootState, path.concat(moduleName), rawModule._children[moduleName]);
    });
  }
}