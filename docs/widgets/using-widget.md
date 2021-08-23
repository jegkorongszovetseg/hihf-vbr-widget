# Widgetek használata

## Használat

Két fájlt kell bellítanod a widgetek eléréséhez:

| Típus           | Link                                                     |
| --------------- | -------------------------------------------------------- |
| javascript      | https://api.icehockey.hu/widgets/js/bundle/v1/mjsz-vbr-bundle   |
| css             | https://api.icehockey.hu/widgets/css/bundle/v1//mjsz-vbr-bundle  |

A `head` részbe illesztve az alábbi kódot, az oldaladon elérhetővé válnak a widgetek.

``` html
<script src="https://api.icehockey.hu/widgets/js/v1/mjsz-vbr-bundle"></script>
<link rel="stylesheet" href="https://api.icehockey.hu/widgets/css/v1/mjsz-vbr-bundle">
```

## Használat html fájlokban

``` html
<meta charset="utf-8">
<title>MJSZ VBR Official Widget Demo</title>
<script src="https://api.icehockey.hu/widgets/js/v1/vbr-official-bundle"></script>
<link rel="stylesheet" href="https://api.icehockey.hu/widgets/css/v1/vbr-official-bundle">

<body>
  <mjsz-vbr-goalies-leader lang="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-goalies-leader>
  <mjsz-vbr-field-players lang="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-field-players>
  <mjsz-vbr-standings lang="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-standings>
  <mjsz-vbr-standings lang="hu" championship-id="2051" division="Alapszakasz" type="2"></mjsz-vbr-standings>
  <mjsz-vbr-schedule lang="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-schedule>
</body>
```

## Azonosítók lekérdezése
Ez a kis alkalmazás segít a megfelelő azonosítók lekérdezésésben.

<SeasonIdentifiers></SeasonIdentifiers>
