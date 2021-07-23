export const fetchVBRData = async (route, apiKey, data) => {
  const url = `${process.env.VUE_APP_VBR_API_URL}/${route}?${objectToQueryString(data)}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      // mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (hasApiError(response)) return reject(response);
        resolve(response.data);
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

const hasApiError = response => {
  return response && response.error;
};
