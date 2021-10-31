class TabManager {
  defaultAlert = null;
  register(_ref) {
    this.defaultAlert = _ref;
  }
  unregister(_ref) {
    this.defaultAlert = null;
  }
  getDefault() {
    return this.defaultAlert;
  }
}

export default new TabManager();
