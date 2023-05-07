import fetchRequest from '../../utils/queries';

describe('fetchRequest', () => {
  it('should return JSON object for successful request with status 200', async () => {
    const data = { name: 'John', age: 30 };
    const response = { json: jest.fn().mockResolvedValue(data), status: 200 };
    const fetch = jest.fn().mockResolvedValue(response);

    global.fetch = fetch;

    const result = await fetchRequest('https://example.com/api', 'GET');

    expect(result).toEqual(data);
    expect(fetch).toHaveBeenCalledWith('https://example.com/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should return JSON object for successful request with status 201', async () => {
    const data = { id: 123, name: 'John', age: 30 };
    const response = { json: jest.fn().mockResolvedValue(data), status: 201 };
    const fetch = jest.fn().mockResolvedValue(response);

    global.fetch = fetch;

    const result = await fetchRequest('https://example.com/api', 'POST', data);

    expect(result).toEqual(data);
    expect(fetch).toHaveBeenCalledWith('https://example.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });

  it('should return status code for unsuccessful request', async () => {
    const response = { status: 404 };
    const fetch = jest.fn().mockResolvedValue(response);

    global.fetch = fetch;

    const result = await fetchRequest('https://example.com/api', 'GET');

    expect(result).toEqual(404);
    expect(fetch).toHaveBeenCalledWith('https://example.com/api', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
