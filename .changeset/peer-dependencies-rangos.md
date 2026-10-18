---
'@chroma-yesid/ui': patch
---

Los `peerDependencies` pasan de versiones exactas (`react 19.3.0`, `react-native 0.88.0`, `react-native-svg 15.16.0`) a rangos (`>=19 <20`, `>=0.88 <1`, `>=15 <16`). Con la `0.1.0` ningún proyecto con otra versión de React podía instalar el paquete sin `--force`.
