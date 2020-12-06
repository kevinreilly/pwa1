import React from 'react';

import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '1rem',
    textAlign: 'left',
  },
  fullWidth: {
    width: '100%',
    flexBasis: '100%',
  },
  hide: {
    display: 'none',
  }
}));

function Plant(props) {
  const classes = useStyles();
  const plant = props.plant;
  let current = false;

  let test = moment();

  for (let m = 0; m < plant.methods.length; m++) {
    let method = plant.methods[m];
    for (let c = 0; c < method.cycles.length; c++) {
      let cycle = method.cycles[c];

      if (cycle.endMonth < cycle.startMonth) {
        //carryover
        let startDate = moment(moment(test).year() + '-'+ cycle.startMonth + '-'+ cycle.startDay);
        let endDate = moment(moment(test).year() + 1 + '-'+ cycle.endMonth + '-'+ cycle.endDay);
        current = moment(test).isBetween(startDate, endDate);

        if (!current) {
          startDate = moment(moment(test).year() - 1 + '-'+ cycle.startMonth + '-'+ cycle.startDay);
          endDate = moment(moment(test).year() + '-'+ cycle.endMonth + '-'+ cycle.endDay);
          current = moment(test).isBetween(startDate, endDate);
        }
      } else {
        let startDate = moment(moment(test).year() + '-'+ cycle.startMonth + '-'+ cycle.startDay);
        let endDate = moment(moment(test).year() + '-'+ cycle.endMonth + '-'+ cycle.endDay);
        current = moment(test).isBetween(startDate, endDate);
      }
    }
  }

  return (
    <Accordion className={current ? '' : classes.hide}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>
          {plant.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails expandIcon={<ExpandMoreIcon />}>
        <Grid className={classes.fullWidth}>
          {plant.methods.map((method, i) =>
            <Grid item key={i} xs={12} className={classes.root}>
              <Typography>
                {method.type}
              </Typography>
              <Typography>
                {method.durationMin} - {method.durationMax} days
              </Typography>
              <Grid className={classes.fullWidth}>
                {method.cycles.map((cycle, i) =>
                  <Grid item key={i} xs={12} className={classes.root}>
                    <Typography>
                      {cycle.startMonth}/{cycle.startDay} - {cycle.endMonth}/{cycle.endDay}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

function Plants(props) {
  const plants = props.plants;

  return (
    <div className="plants">
      {plants.map((plant, i) =>
        <Plant key={i} plant={plant} />
      )}
    </div>
  );
}

function Now(props) {
  return (
    <Plants plants={cropTypes} />
  );
}

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="App">
          <Now />
        </div>
      </ThemeProvider>
    </div>
  );
}

let cropTypes = [
  {
    "name": "Artichokes, Globe", 
    "methods": [
      {
        "type": "transplant",
        "durationMin": 120,
        "durationMax": 180,
        "cycles": [
          {
            "startMonth": 1,
            "startDay": 15,
            "endMonth": 4,
            "endDay": 1
          }
        ]
      },
      {
        "type": "seed",
        "durationMin": 120,
        "durationMax": 180,
        "cycles": [
          {
            "startMonth": 10,
            "startDay": 1,
            "endMonth": 12,
            "endDay": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Artichokes, Jerusalem", 
    "methods": [
      {
        "type": "transplant",
        "durationMin": 180,
        "durationMax": 240,
        "cycles": [
          {
            "startMonth": 1,
            "startDay": 15,
            "endMonth": 6,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Asparagus",
    "methods": [
      {
        "type": "transplant",
        "durationMin": 365,
        "durationMax": 730,
        "cycles": [
          {
            "startMonth": 11,
            "startDay": 1,
            "endMonth": 2,
            "endDay": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Basil",
    "methods": [
      {
        "type": "seed",
        "durationMin": 60,
        "durationMax": 75,
        "cycles": [
          {
            "startMonth": 2,
            "startDay": 15,
            "endMonth": 6,
            "endDay": 1
          }
        ]
      },
      {
        "type": "transplant",
        "durationMin": 30,
        "durationMax": 30,
        "cycles": [
          {
            "startMonth": 3,
            "startDay": 1,
            "endMonth": 6,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Beans, Lima",
    "methods": [
      {
        "type": "seed",
        "durationMin": 60,
        "durationMax": 100,
        "cycles": [
          {
            "startMonth": 3,
            "startDay": 15,
            "endMonth": 4,
            "endDay": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Beans, Pinto",
    "methods": [
      {
        "type": "seed",
        "durationMin": 60,
        "durationMax": 90,
        "cycles": [
          {
            "startMonth": 7,
            "startDay": 15,
            "endMonth": 8,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Beans, Snap",
    "methods": [
      {
        "type": "seed",
        "durationMin": 60,
        "durationMax": 90,
        "cycles": [
          {
            "startMonth": 3,
            "startDay": 15,
            "endMonth": 5,
            "endDay": 1
          },
          {
            "startMonth": 7,
            "startDay": 15,
            "endMonth": 9,
            "endDay": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Beans, Yardlong",
    "methods": [
      {
        "type": "seed",
        "durationMin": 60,
        "durationMax": 90,
        "cycles": [
          {
            "startMonth": 3,
            "startDay": 15,
            "endMonth": 7,
            "endDay": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Beets",
    "methods": [
      {
        "type": "seed",
        "durationMin": 60,
        "durationMax": 80,
        "cycles": [
          {
            "startMonth": 9,
            "startDay": 15,
            "endMonth": 3,
            "endDay": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Blackeyed Peas",
    "methods": [
      {
        "type": "seed",
        "durationMin": 90,
        "durationMax": 120,
        "cycles": [
          {
            "startMonth": 4,
            "startDay": 1,
            "endMonth": 9,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Bok Choy",
    "methods": [
      {
        "type": "seed",
        "durationMin": 45,
        "durationMax": 45,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 3,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Broccoli",
    "methods": [
      {
        "type": "seed",
        "durationMin": 120,
        "durationMax": 130,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 1,
            "endDay": 15
          }
        ]
      },
      {
        "type": "transplant",
        "durationMin": 90,
        "durationMax": 100,
        "cycles": [
          {
            "startMonth": 9,
            "startDay": 15,
            "endMonth": 2,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Brussel Sprouts",
    "methods": [
      {
        "type": "seed",
        "durationMin": 130,
        "durationMax": 150,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 12,
            "endDay": 1
          }
        ]
      },
      {
        "type": "transplant",
        "durationMin": 100,
        "durationMax": 120,
        "cycles": [
          {
            "startMonth": 9,
            "startDay": 1,
            "endMonth": 12,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Cabbage",
    "methods": [
      {
        "type": "seed",
        "durationMin": 120,
        "durationMax": 130,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 1,
            "endDay": 15
          }
        ]
      },
      {
        "type": "transplant",
        "durationMin": 80,
        "durationMax": 90,
        "cycles": [
          {
            "startMonth": 9,
            "startDay": 15,
            "endMonth": 2,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Cabbage, Chinese",
    "methods": [
      {
        "type": "seed",
        "durationMin": 70,
        "durationMax": 80,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 1,
            "endDay": 15
          }
        ]
      },
      {
        "type": "transplant",
        "durationMin": 45,
        "durationMax": 45,
        "cycles": [
          {
            "startMonth": 9,
            "startDay": 15,
            "endMonth": 2,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Carrots",
    "methods": [
      {
        "type": "seed",
        "durationMin": 60,
        "durationMax": 100,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 1,
            "endMonth": 5,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Cauliflower",
    "methods": [
      {
        "type": "seed",
        "durationMin": 120,
        "durationMax": 130,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 1,
            "endDay": 15
          }
        ]
      },
      {
        "type": "transplant",
        "durationMin": 90,
        "durationMax": 100,
        "cycles": [
          {
            "startMonth": 9,
            "startDay": 1,
            "endMonth": 2,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Celery",
    "methods": [
      {
        "type": "seed",
        "durationMin": 120,
        "durationMax": 150,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 1,
            "endDay": 1
          }
        ]
      },
      {
        "type": "transplant",
        "durationMin": 120,
        "durationMax": 150,
        "cycles": [
          {
            "startMonth": 9,
            "startDay": 15,
            "endMonth": 1,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Chard",
    "methods": [
      {
        "type": "seed",
        "durationMin": 60,
        "durationMax": 90,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 2,
            "endDay": 1
          }
        ]
      },
      {
        "type": "transplant",
        "durationMin": 60,
        "durationMax": 90,
        "cycles": [
          {
            "startMonth": 9,
            "startDay": 15,
            "endMonth": 2,
            "endDay": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Collard Greens",
    "methods": [
      {
        "type": "seed",
        "durationMin": 80,
        "durationMax": 80,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 3,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Corn, Sweet",
    "methods": [
      {
        "type": "seed",
        "durationMin": 70,
        "durationMax": 90,
        "cycles": [
          {
            "startMonth": 2,
            "startDay": 15,
            "endMonth": 4,
            "endDay": 15
          },
          {
            "startMonth": 7,
            "startDay": 15,
            "endMonth": 9,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Cucumbers",
    "methods": [
      {
        "type": "seed",
        "durationMin": 60,
        "durationMax": 90,
        "cycles": [
          {
            "startMonth": 2,
            "startDay": 15,
            "endMonth": 5,
            "endDay": 1
          },
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 10,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Cucumbers, Armenian",
    "methods": [
      {
        "type": "seed",
        "durationMin": 55,
        "durationMax": 55,
        "cycles": [
          {
            "startMonth": 2,
            "startDay": 15,
            "endMonth": 7,
            "endDay": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Eggplant",
    "methods": [
      {
        "type": "transplant",
        "durationMin": 70,
        "durationMax": 120,
        "cycles": [
          {
            "startMonth": 3,
            "startDay": 1,
            "endMonth": 4,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Endive",
    "methods": [
      {
        "type": "seed",
        "durationMin": 80,
        "durationMax": 120,
        "cycles": [
          {
            "startMonth": 9,
            "startDay": 1,
            "endMonth": 2,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Garlic",
    "methods": [
      {
        "type": "cloves",
        "durationMin": 150,
        "durationMax": 210,
        "cycles": [
          {
            "startMonth": 10,
            "startDay": 1,
            "endMonth": 11,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Kale",
    "methods": [
      {
        "type": "seed",
        "durationMin": 60,
        "durationMax": 90,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 1,
            "endDay": 1
          }
        ]
      }
    ]
  },
  {
    "name": "Kohlrabi",
    "methods": [
      {
        "type": "seed",
        "durationMin": 50,
        "durationMax": 60,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 12,
            "endDay": 1
          }
        ]
      },
      {
        "type": "transplant",
        "durationMin": 45,
        "durationMax": 60,
        "cycles": [
          {
            "startMonth": 10,
            "startDay": 15,
            "endMonth": 2,
            "endDay": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Lettuce, Head",
    "methods": [
      {
        "type": "seed",
        "durationMin": 50,
        "durationMax": 100,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 2,
            "endDay": 1
          }
        ]
      },
      {
        "type": "transplant",
        "durationMin": 50,
        "durationMax": 100,
        "cycles": [
          {
            "startMonth": 9,
            "startDay": 15,
            "endMonth": 2,
            "endDay": 15
          }
        ]
      }
    ]
  },
  {
    "name": "Lettuce, Leaf",
    "methods": [
      {
        "type": "seed",
        "durationMin": 50,
        "durationMax": 100,
        "cycles": [
          {
            "startMonth": 8,
            "startDay": 15,
            "endMonth": 2,
            "endDay": 15
          }
        ]
      },
      {
        "type": "transplant",
        "durationMin": 50,
        "durationMax": 100,
        "cycles": [
          {
            "startMonth": 9,
            "startDay": 15,
            "endMonth": 3,
            "endDay": 1
          }
        ]
      }
    ]
  }
];

export default App;
