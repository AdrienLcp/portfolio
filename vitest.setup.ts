// React only treats `act()` as a test boundary with this flag set, and warns on
// every mount otherwise.
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
