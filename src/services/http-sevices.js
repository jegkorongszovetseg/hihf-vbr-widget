export const fetchVBRData = async data => {
  const { type, ...payload } = data;
  const url = `http://localhost:3333/vbr/${type}?${objectToQueryString(payload)}`;
  const response = await fetch(url, {
    method: 'GET',
    // mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      key: '9b972c1eefd40379dcc9a48e45739edceb96857991593dd02daadb63fb17e24c'
    }
    // body: JSON.stringify(payload)
  });
  return response.json();
};

const objectToQueryString = obj => {
  return Object.keys(obj)
    .map(key => key + '=' + obj[key])
    .join('&');
};
