---
sidebar: auto
---

# VBR API elérés
Ha saját megoldást szeretnél készíteni az adatok megjenítésére, akkor az alábbi megoldások segítenek ebben.
::: tip VBR API kulcs kérése
Ha kapcsolódni szeretnél a MJSZ Versenybírósági rendszeréhez, kérjük vedd fel a kapcsolatot a Magyar Jégkorong Szövetséggel: [info@icehockey.hu](mailto:info@icehockey.hu)
:::

Amennyiben rendelkezel a megfelelő jogosultsággal, akkor kapcsolódhatsz a rendszerhez az általunk generelált Api kulcs segítségével.

Az API kulcsot a request headerben kell küldeni:
``` js
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': 'dd8adf5fdb738b3741fa579b5ede5ce69b681f62'
  }
```

## Példák kapcsolódásra

### Curl
```
curl -X GET "https://api.icehockey.hu/vbr/v1/championshipTeams?championshipId=2051" -H  "accept: application/json" -H  "x-api-key: dd8adf5fdb738b3741fa579b5ede5ce69b681f62"
```
### Javascript - Axios
``` js
// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  
```

### Javascript - Fetch
``` js
export const fetchVBRData = async (route, apiKey, data) => {
  const url = `${process.env.VUE_APP_VBR_API_URL}/${route}?${objectToQueryString(data)}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
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

```