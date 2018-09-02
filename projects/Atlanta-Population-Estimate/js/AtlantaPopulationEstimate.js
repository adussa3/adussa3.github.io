mapboxgl.accessToken = 'pk.eyJ1IjoiaHJlY2h0IiwiYSI6IlFwV2hZMlUifQ.dwfwZ5jzPU1xv2mYYVzXlQ';

// global variable for year
var year = document.getElementById('active-year').innerText - 2000;

//globals for the choropleth
var COLORS = ['#ffffb2', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#b10026'],
    BREAKS = [0, 10000, 20000, 30000, 40000, 50000, 60000],
    FILTERUSE;
//create a map using the Mapbox Light theme, zoomed in to DC
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v8',
    center: [-84.525, 33.7490],
    zoom: 10
});

map.on('load', function() {
  map.addSource("atlanta", {
    type: 'geojson',
    data: 'data/geojson/atl_population_data_2011.geojson'
  });

  map.addLayer({
    "id": "tracts",
    "type": "fill",
    "source": "atlanta",
    "paint": {
      "fill-color": {
        property: 'ACS_11_5YR_DP05_with_ann_new_HC01_VC03',
        stops: [
            [BREAKS[0], COLORS[0]],
            [BREAKS[1], COLORS[1]],
            [BREAKS[2], COLORS[2]],
            [BREAKS[3], COLORS[3]],
            [BREAKS[4], COLORS[4]],
            [BREAKS[5], COLORS[5]],
            [BREAKS[6], COLORS[6]]
        ]
      },
      "fill-opacity": 1,
      "fill-outline-color": "#ffffff"
    }
  });
});

/******************************************************************************/

// https://bl.ocks.org/hrecht/82b6440ed3b982a6f594
// https://www.mapbox.com/help/choropleth-studio-gl-pt-1/
// https://www.mapbox.com/help/choropleth-studio-gl-pt-2/
// https://www.mapbox.com/help/gl-dds-map-tutorial/
// https://www.mapbox.com/help/add-points-pt-3/
map.on("mousemove", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ["tracts"]
    });

    if (features.length) {
      //show name and value in sidebar
      document.getElementById('tooltip-name').innerHTML = "<strong>Zip Code:</strong> " + features[0].properties.GEOID10;

      if (document.getElementById('total').selected) {
        document.getElementById('tooltip').innerHTML = "<strong>Total Population Estimate:</strong> "
        + Math.round(features[0].properties['ACS_' + year + '_5YR_DP05_with_ann_new_HC01_VC03']);

        var BREAKS = [0, 10000, 20000, 30000, 40000, 50000, 60000];
        map.addLayer({
          "id": "tracts",
          "type": "fill",
          "source": "atlanta",
          "paint": {
            "fill-color": {
                property: 'ACS_' + year + '_5YR_DP05_with_ann_new_HC01_VC03',
                stops: [
                  [BREAKS[0], COLORS[0]],
                  [BREAKS[1], COLORS[1]],
                  [BREAKS[2], COLORS[2]],
                  [BREAKS[3], COLORS[3]],
                  [BREAKS[4], COLORS[4]],
                  [BREAKS[5], COLORS[5]],
                  [BREAKS[6], COLORS[6]]
                ]
            },
            "fill-opacity": 1,
            "fill-outline-color": "#ffffff"
          }
        });

        document.getElementById('key1').innerHTML = "<span style='background-color: #ffffb2'></span>0 - 9999";
        document.getElementById('key2').innerHTML = "<span style='background-color: #fed976'></span>10000 - 19999";
        document.getElementById('key3').innerHTML = "<span style='background-color: #feb24c'></span>20000 - 29999";
        document.getElementById('key4').innerHTML = "<span style='background-color: #fd8d3c'></span>30000 - 39999";
        document.getElementById('key5').innerHTML = "<span style='background-color: #fc4e2a'></span>40000 - 49999";
        document.getElementById('key6').innerHTML = "<span style='background-color: #e31a1c'></span>50000 - 59999";
        document.getElementById('key7').innerHTML = "<span style='background-color: #b10026'></span>60000+";
      }

      else if (document.getElementById('age_20-24').selected) {
        document.getElementById('tooltip').innerHTML = "<strong>20 - 24 Population Estimate:</strong> "
        + Math.round(features[0].properties['ACS_' + year + '_5YR_DP05_with_ann_new_HC01_VC11']);

        var BREAKS = [0, 1666, 3333, 5000, 6666, 8333, 10000];
        map.addLayer({
          "id": "tracts",
          "type": "fill",
          "source": "atlanta",
          "paint": {
            "fill-color": {
              property: 'ACS_' + year + '_5YR_DP05_with_ann_new_HC01_VC11',
              stops: [
                  [BREAKS[0], COLORS[0]],
                  [BREAKS[1], COLORS[1]],
                  [BREAKS[2], COLORS[2]],
                  [BREAKS[3], COLORS[3]],
                  [BREAKS[4], COLORS[4]],
                  [BREAKS[5], COLORS[5]],
                  [BREAKS[6], COLORS[6]]
              ]
            },
            "fill-opacity": 1,
            "fill-outline-color": "#ffffff"
          }
        });

        document.getElementById('key1').innerHTML = "<span style='background-color: #ffffb2'></span>0 - 1665";
        document.getElementById('key2').innerHTML = "<span style='background-color: #fed976'></span>1666 - 3332";
        document.getElementById('key3').innerHTML = "<span style='background-color: #feb24c'></span>3333 - 4999";
        document.getElementById('key4').innerHTML = "<span style='background-color: #fd8d3c'></span>5000 - 6665";
        document.getElementById('key5').innerHTML = "<span style='background-color: #fc4e2a'></span>6666 - 8332";
        document.getElementById('key6').innerHTML = "<span style='background-color: #e31a1c'></span>8333 - 9999";
        document.getElementById('key7').innerHTML = "<span style='background-color: #b10026'></span>10000+";
      }

      else if (document.getElementById('age_25-34').selected) {
        document.getElementById('tooltip').innerHTML = "<strong>25 - 34 Population Estimate:</strong> "
        + Math.round(features[0].properties['ACS_' + year + '_5YR_DP05_with_ann_new_HC01_VC12']);

        var BREAKS = [0, 1666, 3333, 5000, 6666, 8333, 10000];
        map.addLayer({
          "id": "tracts",
          "type": "fill",
          "source": "atlanta",
          "paint": {
            "fill-color": {
              property: 'ACS_' + year + '_5YR_DP05_with_ann_new_HC01_VC12',
              stops: [
                [BREAKS[0], COLORS[0]],
                [BREAKS[1], COLORS[1]],
                [BREAKS[2], COLORS[2]],
                [BREAKS[3], COLORS[3]],
                [BREAKS[4], COLORS[4]],
                [BREAKS[5], COLORS[5]],
                [BREAKS[6], COLORS[6]]
              ]
            },
            "fill-opacity": 1,
            "fill-outline-color": "#ffffff"
          }
        });

        document.getElementById('key1').innerHTML = "<span style='background-color: #ffffb2'></span>0 - 1665";
        document.getElementById('key2').innerHTML = "<span style='background-color: #fed976'></span>1666 - 3332";
        document.getElementById('key3').innerHTML = "<span style='background-color: #feb24c'></span>3333 - 4999";
        document.getElementById('key4').innerHTML = "<span style='background-color: #fd8d3c'></span>5000 - 6665";
        document.getElementById('key5').innerHTML = "<span style='background-color: #fc4e2a'></span>6666 - 8332";
        document.getElementById('key6').innerHTML = "<span style='background-color: #e31a1c'></span>8333 - 9999";
        document.getElementById('key7').innerHTML = "<span style='background-color: #b10026'></span>10000+";
      }

    } else {
      //if not hovering over a feature set tooltip to empty
      document.getElementById('tooltip-name').innerHTML = "Hover over a zip code!";
      document.getElementById('tooltip').innerHTML = "";
    }
});





// https://www.mapbox.com/help/show-changes-over-time/
document.getElementById('slider').addEventListener('input', function(e) {

  year = parseInt(e.target.value); /* this is redefining the global variable */

  // update text in the UI
  document.getElementById('active-year').innerText = year + 2000;

  // get data from that year
  map.getSource("atlanta").setData('data/geojson/atl_population_data_' + (year + 2000) + '.geojson');
});