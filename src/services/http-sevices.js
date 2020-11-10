export const fetchVBRData = async (route, data) => {
  const url = `http://localhost:3333/vbr${route}?${objectToQueryString(data)}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      // mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        key: '9b972c1eefd40379dcc9a48e45739edceb96857991593dd02daadb63fb17e24c'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response && response.error && response.error.status >= 400) throw Error(response.error.message);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const objectToQueryString = obj => {
  return Object.keys(obj)
    .map(key => key + '=' + obj[key])
    .join('&');
};
