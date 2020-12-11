/**
 * Create TCP Echo server
 * @module WeTTy
 */
import type { TcpEchoServer } from './shared/interfaces.js';
import { logger } from './shared/logger.js';
import {
  tcpEchoServerDefault,
} from './shared/defaults.js';
import net from 'net';

/**
 * Starts TCP Echo Server
 * @name startTcpEcho
 * @returns TCP server
 */
export function startTcpEcho(
  tcpEchoServerConf: TcpEchoServer = tcpEchoServerDefault,
): net.Server {

  const server = net.createServer();

  server.on('error', (error) => {
    logger.error(error)
    server.close()
  });

  const sockets: net.Socket[] = []
  server.on('connection', sock => {
    logger.info(`Connected at ${sock.remoteAddress}:${sock.remotePort}`)

    sockets.push(sock)

    sock.on('data', data => {
      
      logger.info( data.toString() + ` | Received ${sock.bytesRead} bytes from ${sock.remoteAddress}:${sock.remotePort}`)

      let timestp = new Date()
      const response = {
        description: 'TCP PORT TEST BY RMS Math',
        serverIP: tcpEchoServerConf.host,
        serverPort: tcpEchoServerConf.port,
        timestamp: timestp.toJSON(),
        received: {
          message: data.toString(),
          fromIP: sock.remoteAddress,
          fromPort: sock.remotePort
        }
      }
      const dataBuffer = Buffer.from(JSON.stringify(response))

      // Write the data back to all the connected, the client will receive it as data from the server
      sockets.forEach((sock, index, array) => {
        sock.write(dataBuffer)	
      })
    })

    sock.on('close', data => {
      let index = sockets.findIndex( o => {
        return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort
      })

      if (index !== -1) { 
        sockets.splice(index, 1) 
      }
      logger.info(`Socket closed with ${sock.remoteAddress}:${sock.remotePort}`)
    })
  });


  server.listen(tcpEchoServerConf.port, tcpEchoServerConf.host, () => {
    const address = server.address() as net.AddressInfo
    const port = address.port;
    const family = address.family
    const ipaddr = address.address
    
    logger.info('Server is listening at port ' + port)
    logger.info('Server ip :' + ipaddr)
    logger.info('Server is IP4/IP6 : ' + family)
  });

  return server;
}