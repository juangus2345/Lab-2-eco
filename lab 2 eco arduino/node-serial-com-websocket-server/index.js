import { express, Server, cors, SerialPort, ReadlineParser } from './dependencies.js'

const PORT = 8080;
const IPaddress = "192.168.0.3"
const SERVER_IP = IPaddress;

//⚙️ HTTP COMMUNICATION SETUP _________________________________________________
const app = express();
// const STATIC_MUPI_DISPLAY = express.static('public-display');
// app.use('/mupi-display', STATIC_MUPI_DISPLAY);
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use('/LEDS', express.static('public-display'));
//============================================ END

//⚙️ SERIAL COMMUNICATION SETUP -------------------------------------------------
const protocolConfiguration = { // *New: Defining Serial configurations
    path: 'COM10', //*Change this COM# or usbmodem#####
    baudRate: 9600
};

const port = new SerialPort(protocolConfiguration);

const parser = port.pipe(new ReadlineParser);
parser.on('data',(arduinoData)=>{
    let arduinoArray=arduinoData.split(' ');
    let arduinostatus = {
        statusA: parseInt(arduinoArray[1]),
        statusB: parseInt(arduinoArray[2]),
        signal: parseInt(arduinoArray[0])
    }
    ioServer.emit('arduinoMessage', arduinostatus);
    console.log(arduinostatus);

})
const httpServer = app.listen(PORT, () => {
    console.table(
        {
            'Mupi display:' : `http://${SERVER_IP}:${PORT}/LEDS`,
        }
    )
});
const ioServer = new Server(httpServer, { path: '/real-time' });


ioServer.on('connection', (socket) => {

    socket.on('orderForArduino', (orderForArduino) => {
        port.write(orderForArduino);
        console.log('orderForArduino: ' + orderForArduino);
    });
});
