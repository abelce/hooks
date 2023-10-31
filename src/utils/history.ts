enum Action {
  Pop = 'POP',
  Push = 'PUSH',
  Replace = 'REPLACE',
}

interface Path {
  pathname: string;
  hash: string;
  search: string;
}

export interface Location<State = any> extends Path {
  state: State;
}

export type Update = {
  action: Action;
  location: Location;
};

interface Listener {
  (update: Update): void;
}

export type History = {
  location: Location;
  listen(fn: Listener): () => void;
  replace: (to: To, state?: any) => void;
  push: (to: To, state?: any) => void;
  createHref: (to: To) => string | undefined;
  go: (delta: number) => void;
};

type To = string | Partial<Path>;

const parsePath = (path: string): Partial<Path> => {
  const parsedPath: Partial<Path> = {};
  if (path) {
    const hashIndex = path.indexOf('#');
    if (hashIndex >= 0) {
      parsedPath.hash = path.substring(hashIndex);
      path = path.substring(0, hashIndex);
    }
    const searchIndex = path.indexOf('?');
    if (searchIndex >= 0) {
      parsedPath.search = path.substring(searchIndex);
      path = path.substring(0, searchIndex);
    }
    parsedPath.pathname = path;
  }
  return parsedPath;
};

export const createLocation = (
  current: string | Location,
  to: To,
  state?: any,
): Location => {
  return {
    pathname: typeof current === 'string' ? current : current.pathname,
    hash: '',
    search: '',
    ...(typeof to === 'string' ? parsePath(to) : to),
    state,
  };
};

export const createHistory = () => {
  let listener: Listener | null = null;
  let action = Action.Pop;

  const globalHistory = window.history;

  const history: History = {
    get location(): Location {
      const { pathname, hash, search } = window.location;
      return createLocation('', {
        pathname,
        hash,
        search,
      });
    },
    listen(fn: Listener) {
      const handlePop = () => {
        action = Action.Pop;
        listener?.({
          action,
          location: history.location,
        });
      };

      window.addEventListener('popstate', handlePop);
      listener = fn;

      return () => {
        window.removeEventListener('popstate', handlePop);
        listener = null;
      };
    },
    replace(to: To, state?: any) {
      action = Action.Push;
      const location = createLocation(history.location, to, state);
      const url = history.createHref(location);
      globalHistory.pushState(state, '', url);
      listener?.({
        action,
        location: history.location,
      });
    },
    push(to: To, state?: any) {
      action = Action.Push;
      const location = createLocation(history.location, to, state);
      const url = history.createHref(location);
      globalHistory.pushState(state, '', url);
      listener?.({
        action,
        location: history.location,
      });
    },
    createHref(to: To): string | undefined {
      if (typeof to === 'string') {
        return to;
      }

      const { pathname, search, hash } = to;
      let path = pathname;
      if (search && search !== '') {
        path += search.charAt(0) === '?' ? search : '?' + search;
      }
      if (hash && hash !== '#') {
        path += hash.charAt(0) === '#' ? hash : '#' + hash;
      }
      return path;
    },
    go(delta: number) {
      globalHistory.go(delta);
    },
  };

  return history;
};
