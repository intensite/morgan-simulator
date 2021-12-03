
const fs = require('fs')
const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const parser = new Readline();
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const port = new SerialPort('COM4', {
    baudRate: 115200
})

port.pipe(parser)
parser.on('data', console.log)
console.log("Waiting 20sec for Morgan to sabilize....");

var dataArray;
var dataptr = 0;
var timer = null;

// Read data file
try {
    const data = fs.readFileSync('Simulation-2.csv', 'utf8')
    dataArray = data.split(/\r?\n/);  //Be careful if you are in a \r\n world...
    console.log(dataArray.length);
    
    // console.log(data)
  } catch (err) {
    console.error(err)
  }
  


  port.write('SET SIM_MODE 1\n', function (err) {
    if (err) {
        return console.log('Error on write: ', err.message)
    }
    console.log('SIMULATION MODE ENABLED..\n');
    rl.question('Press enter to start simulation', (answer) => {
        console.log(`Simulation stated...`);

        const interval = setInterval(function simul() {

            // console.log(dataArray[dataptr++]);
            
            port.write(`${dataArray[dataptr++]}\n`, function (err) {
                if (err) {
                    return console.log('Error on write: ', err.message)
                }
                // console.log('message written')
            })

            if(dataptr >= dataArray.length) {
                clearInterval(interval);
                
                console.log("Simulation terminée!");
                process.exit(1);
            }

        }, 50);  // Data is sent every 100 milliseconds. Change here if necessary.
        rl.close();
    });
})











