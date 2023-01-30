![Hexifier](https://raw.githubusercontent.com/jedluk/hexifier/main/src/components/svg/logo.svg)

[Web app](https://jedluk.github.io/hexifier/) for easy geojson <=> H3 conversion and more.

![Screen](https://raw.githubusercontent.com//jedluk/random/master/hexifier/hexifier.png)


# Manual:
 - draw polygon on map / drop geoJSON with polygon feature or collection of polygons 
 - you can also drop a marker on a map and populate app with geoJSON returned by [Nominatim](https://nominatim.org/release-docs/develop/api/Reverse/)
 - select hex size from a list (max available size is calculated based on area of drawn polygon. Due to perfomance reasons number of resulting hexes has to be less than 100_000)
 - 'compact' option is also available (minimum number of mixed size hexes to cover area with high accuracy)
 - convert
 - export & enjoy
