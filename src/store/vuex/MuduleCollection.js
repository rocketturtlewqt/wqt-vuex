export default class ModuleCollection{
  constructor(options) {
    this.register([], options);
  }

  register(path, rootModule) {
    let rawModule = {
      _raw: rootModule,
      _children: {},
      state: rootModule.state
    }
    if (!this.root) {
      this.root = rawModule;
    } else {
      let parentNode = path.slice(0,-1).reduce((root, current) => {
        return root._children[current];
      }, this.root);
      parentNode._children[path[path.length - 1]] = rawModule;
    }

    if (rootModule.modules) {
      Object.keys(rootModule.modules).forEach(moduleName => {
        this.register(path.concat(moduleName), rootModule.modules[moduleName]);
      });
    }
  }
}