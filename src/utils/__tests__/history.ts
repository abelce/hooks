import { createHistory, createLocation, Update } from '../history';

describe('test history', () => {
  it('should return location object', () => {
    expect(createLocation('', '/home?type=phone#test')).toEqual({
      pathname: '/home',
      search: '?type=phone',
      hash: '#test',
      state: undefined,
    });
  });

  it('should create history instance', () => {
    const history = createHistory();
    expect(history.location).toStrictEqual({
      pathname: expect.any(String),
      hash: expect.any(String),
      search: expect.any(String),
      state: undefined,
    });

    // test createHref
    expect(
      history.createHref({
        pathname: '/home',
        search: 'type=phone',
        hash: 'detail',
      }),
    ).toBe('/home?type=phone#detail');
    expect(history.createHref('/home')).toBe('/home');

    // listen
    history.listen((update: Update) => {
      expect(update).toStrictEqual({
        action: expect.any(String),
        location: {
          pathname: expect.any(String),
          hash: expect.any(String),
          search: expect.any(String),
          state: undefined,
        },
      });
    });

    // test push
    history.push({
      pathname: '/detail',
    });
    // test replace
    history.replace({
      pathname: '/product/detail',
    });
    // test go
    history.go(1);
  });
});
