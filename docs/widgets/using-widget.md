# Widgetek használata

## Használat

Because VuePress applications are server-rendered in Node.js when generating static builds, any Vue usage must conform to the [universal code requirements](https://ssr.vuejs.org/en/universal.html). In short, make sure to only access Browser / DOM APIs in `beforeMount` or `mounted` hooks.

If you are using or demoing components that are not SSR friendly (for example containing custom directives), you can wrap them inside the built-in `<ClientOnly>` component:

``` html
<script src="https://api.icehockey.hu/widgets/js/v1/vbr-official-bundle"></script>
<link rel="stylesheet" href="https://api.icehockey.hu/widgets/css/v1/vbr-official-bundle">
```

##

``` html
<meta charset="utf-8">
<title>vbr-official-bundle demo</title>
<script src="https://unpkg.com/vue"></script>
<script src="https://api.icehockey.hu/widgets/js/v1/vbr-official-bundle"></script>
<link rel="stylesheet" href="https://api.icehockey.hu/widgets/css/v1/vbr-official-bundle">

<body>
  <div>
    <mjsz-vbr-goalies-leader lang="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-goalies-leader>
    <mjsz-vbr-field-players lang="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-field-players>
    <mjsz-vbr-standings lang="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-standings>
    <mjsz-vbr-standings lang="hu" championship-id="2051" division="Alapszakasz" type="2"></mjsz-vbr-standings>
    <mjsz-vbr-schedule lang="hu" championship-id="2051" division="Alapszakasz"></mjsz-vbr-schedule>
  </div>
</body>
```
