# Tabella

## Használat
``` html
<vbr-standings
  api-key="1234567890"
  lang="hu" 
  championship-id="2051"
  division="Alapszakasz"
/>
```
## Példa

<Widget
  name="Standings"
  lang="hu"
  championship-id="2051"
  division="Alapszakasz" 
/>

## Változók

| prop            | Default          | Leírás              |
| --------------- | ---------------- | ------------------- |
| api-key         | kötelező         | Api kulcs           |
| lang            | hu               | `hu | en` Nyelv     |
| championship-id | kötelező         | Bajnokság azonosító |
| division        | kötelező         | Bajnokság szakasz   |
| type            | 3 `3 | 2`        | Pont számítási rendszer   |
