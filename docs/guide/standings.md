# Tabella

## Használat
``` html
<Standings
  api-key="1234567890"
  lang="hu" 
  championship-id="2051"
  division="Alapszakasz"
/>
```
## Példa

<ClientOnly>
<Widget
  name="Standings"
  api-key="9b918f8ddadbdb2382949a37946642aa9a3f73b8"
  lang="hu"
  championship-id="2051"
  division="Alapszakasz" 
/>
</ClientOnly>

## Változók

| prop            | Default          | Leírás              |
| --------------- | ---------------- | ------------------- |
| api-key         | kötelező         | Api kulcs           |
| lang            | hu               | `hu | en` Nyelv     |
| championship-id | kötelező         | Bajnokság azonosító |
| division        | kötelező         | Bajnokság szakasz   |
| type            | 3 `3 | 2`        | Pont számítási rendszer   |
