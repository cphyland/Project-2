Notes on data exports in open GIS formats

--------------
GeoJson/GeoCSV
--------------
These are interchange formats for geospatial data, typically used during data collection or to transmit selected structured data to a system that will further manipulate the data and/or present it to end users. GeoJson is based on JavaScript Object Notation (JSON) and does not employ strong data-typing for numbers or have explicit support for dates. All data is represented as text. JSON is not appropriate for applications requiring binary data. Boolean values true and false are allowed as values. There is minimal support for coding missing data, using the null value. See http://geojson.org/geojson-spec.html. GeoCSV is an extension of the "human readable", tabular file format Comma-Separated Values. CSV files are a common interchange format between software packages supporting tabular data and are also easily produced manually with a text editor or with end-user written scripts or programs. GeoJson and GeoCSV are generally not suited to very large datasets.

----------
GeoPackage
----------
Primarily a middle-state format for a package of tiled raster images and/or vector features that can be transmitted between applications (see http://www.geopackage.org/spec/). GeoPackages are designed to be interoperable across enterprise and personal computing environments and usable on mobile devices with limited connectivity and bandwidth. An important use case for designing GeoPackage was mobile device use. The .gpkg file is in the SQLite database file format.